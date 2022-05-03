// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Manufacturer {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    address[] manufacturer = [
        0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,
        0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    ];

    struct Drugdetails {
        string name;
        uint256 netContent;
        string mfgLicenseNum;
        uint256 batchNum;
        uint256 mfdDate;
        uint256 expDate;
        uint256 price;
        string mfdBy;
        string ingredients;
    }

    mapping(address => Drugdetails[]) MfgData;

    modifier onlyManufacturers() {
        require(
            msg.sender == manufacturer[0] || msg.sender == manufacturer[1],
            "You are not a manufacturer"
        );
        _;
    }

    function setDrugDetails(
        string memory _name,
        uint256 _netContent,
        string memory _mfgLicenseNum,
        uint256 _batchNum,
        uint256 _mfdDate,
        uint256 _expDate,
        uint256 _price,
        string memory _mfdBy,
        string memory _ingredients
    ) external onlyManufacturers {
        MfgData[msg.sender].push(
            Drugdetails({
                name: _name,
                netContent: _netContent,
                mfgLicenseNum: _mfgLicenseNum,
                batchNum: _batchNum,
                mfdDate: _mfdDate,
                expDate: _expDate,
                price: _price,
                mfdBy: _mfdBy,
                ingredients: _ingredients
            })
        );
    }

    function getDrugDetails(address _mfgAdrs, uint256 _id)
        external
        view
        returns (
            string memory name,
            uint256 netContent,
            string memory mfgLicenseNum,
            uint256 batchNum,
            uint256 mfdDate,
            uint256 expDate,
            uint256 price,
            string memory mfdBy,
            string memory ingredients
        )
    {
        Drugdetails memory data = MfgData[_mfgAdrs][_id - 1];
        return (
            data.name,
            data.netContent,
            data.mfgLicenseNum,
            data.batchNum,
            data.mfdDate,
            data.expDate,
            data.price,
            data.mfdBy,
            data.ingredients
        );
    }
}
