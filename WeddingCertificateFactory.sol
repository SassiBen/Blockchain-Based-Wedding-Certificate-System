// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WeddingCertificate.sol";

contract WeddingCertificateFactory {
    WeddingCertificate[] public certificates;

    event CertificateCreated(address certificateAddress);
    event DivorceFiled(address certificateAddress);


    function createCertificate(string calldata _partner1, string calldata _partner2, uint16 _day, uint16 _month, uint16 _year, string calldata _children) external {
        WeddingCertificate newCertificate = new WeddingCertificate(_partner1, _partner2, _day, _month, _year, _children);
        certificates.push(newCertificate);
        emit CertificateCreated(address(newCertificate));
    }

    function getCertificatesCount() external view returns (uint) {
        return certificates.length;
    }

    function getCertificate(address certificateAddress) external view returns (string memory, string memory, uint16, uint16, uint16, string memory, bool) {
        WeddingCertificate certificate = WeddingCertificate(certificateAddress);
        return certificate.getWeddingDetails();
    }

    function fileDivorce(address certificateAddress) external {

        // Check if the certificate exists in the array
        bool exists = false;
        for (uint i = 0; i < certificates.length; i++) {
            if (address(certificates[i]) == certificateAddress) {
                exists = true;
                break;
            }
        }
        require(exists, "Certificate does not exist.");

        WeddingCertificate certificate = WeddingCertificate(certificateAddress);
        certificate.fileForDivorce();
        emit DivorceFiled(certificateAddress);
    }

}
