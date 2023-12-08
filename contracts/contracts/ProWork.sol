// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

//  ZetaChain Contracts
import "@zetachain/protocol-contracts/contracts/zevm/SystemContract.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/zContract.sol";
import "@zetachain/toolkit/contracts/SwapHelperLib.sol";
import "@zetachain/toolkit/contracts/BytesHelperLib.sol";

// OpenZeppelin Contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProWork is
    zContract,
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    AccessControl
{
    SystemContract public immutable systemContract;
    uint256 constant BITCOIN = 18332;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 private _nextTokenId;
    string public baseUri;

    error WrongGasContract();
    error NotEnoughToPayGasFee();

    constructor(
        address systemContractAddress,
        address defaultAdmin,
        string memory baseURI
    ) ERC721("ProWork", "WORK") {
        systemContract = SystemContract(systemContractAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, defaultAdmin);
        setBaseURI(baseURI);
    }

    modifier onlySystem() {
        require(
            msg.sender == address(systemContract),
            "Only system contract can call this function"
        );
        _;
    }

    function setBaseURI(string memory _uri) public onlyRole(MINTER_ROLE) {
        baseUri = _uri;
    }

    function _baseURI()
        internal
        view
        virtual
        override(ERC721)
        returns (string memory)
    {
        return baseUri;
    }

    function bytesToAddress(bytes memory b) internal pure returns (address a) {
        require(b.length == 20);
        assembly {
            a := div(mload(add(b, 32)), exp(256, 12))
        }
    }

    function buildTokenURI(
        address from,
        address to,
        uint256 amount,
        address destinationToken
    ) internal view returns (string memory) {
        bytes memory uri = abi.encodePacked(
            _baseURI(),
            "?from=",
            Strings.toHexString(uint256(uint160(from)), 20),
            "&to=",
            Strings.toHexString(uint256(uint160(to)), 20),
            "&amount=",
            Strings.toString(amount),
            "&destinationToken=",
            Strings.toHexString(uint256(uint160(destinationToken)), 20)
        );
        return string(uri);
    }

    function onCrossChainCall(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem {
        address targetTokenAddress;
        bytes memory senderAddress;
        bytes memory recipientAddress;

        if (context.chainID == BITCOIN) {
            targetTokenAddress = BytesHelperLib.bytesToAddress(message, 0);
            senderAddress = abi.encodePacked(
                BytesHelperLib.bytesToAddress(message, 20)
            );
            recipientAddress = abi.encodePacked(
                BytesHelperLib.bytesToAddress(message, 40)
            );
        } else {
            (
                address targetToken,
                bytes memory sender,
                bytes memory recipient
            ) = abi.decode(message, (address, bytes, bytes));
            targetTokenAddress = targetToken;
            recipientAddress = recipient;
            senderAddress = sender;
        }

        uint256 outputAmount = SwapHelperLib._doSwap(
            systemContract.wZetaContractAddress(),
            systemContract.uniswapv2FactoryAddress(),
            systemContract.uniswapv2Router02Address(),
            zrc20,
            amount,
            targetTokenAddress,
            0
        );

        (address gasZRC20, uint256 gasFee) = IZRC20(targetTokenAddress)
            .withdrawGasFee();

        if (gasZRC20 != targetTokenAddress) revert WrongGasContract();
        if (gasFee >= outputAmount) revert NotEnoughToPayGasFee();

        IZRC20(targetTokenAddress).approve(targetTokenAddress, gasFee);
        IZRC20(targetTokenAddress).withdraw(
            recipientAddress,
            outputAmount - gasFee
        );

        address from = bytesToAddress(senderAddress);
        address to = bytesToAddress(recipientAddress);
        string memory uri = buildTokenURI(
            from,
            to,
            outputAmount - gasFee,
            targetTokenAddress
        );

        safeMint(to, uri);
    }

    function estimateGas(address targetTokenAddress) public returns (uint256) {
        (address gasZRC20, uint256 gasFee) = IZRC20(targetTokenAddress)
            .withdrawGasFee();
        if (gasZRC20 != targetTokenAddress) revert WrongGasContract();
        return gasFee;
    }

    // NFT Logic

    function safeMint(address to, string memory uri) internal {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override(ERC721, ERC721Enumerable) {
        return super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _burn(
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}
