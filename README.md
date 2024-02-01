# Blockchain-Based-Wedding-Certificate-System

## Blockchain Part

### Overview

This project aimed to create a blockchain-based system for formalizing the union of two individuals. The system was developed on the Sepolia test net blockchain and involved the creation of two Solidity smart contracts: `WeddingCertificate` and `WeddingCertificateFactory`.

### Objectives

1. **Smart Contract Development**: To design and implement smart contracts that can record and manage the details of a marital union.
2. **Blockchain Integration**: To deploy these contracts on the Sepolia test net blockchain, ensuring security, transparency, and immutability.

### Smart Contracts

#### 1. WeddingCertificate (`WeddingCertificate.sol`)

- **Purpose**: To store the details of a specific wedding.
- **Features**:
    - Stores the names of partners and children.
    - Records the wedding date.
    - Tracks the divorce status.
    - Allows retrieval of wedding details.
    - Enables filing for divorce, updating the divorce status.

#### 2. WeddingCertificateFactory (`WeddingCertificateFactory.sol`)

- **Purpose**: To manage multiple `WeddingCertificate` instances.
- **Features**:
    - Creation of new `WeddingCertificate` contracts.
    - Tracking and retrieval of created certificates.
    - Facilitates the divorce process for a specific certificate.

### Implementation Details

- **Language**: Solidity ^0.8.0.
- **Key Structures**:
    - `Date`: A struct to handle the wedding date.
    - `WeddingCertificate`: A contract to handle individual wedding details.
    - `WeddingCertificateFactory`: A factory contract to create and manage multiple `WeddingCertificate` instances.
- **Events**:
    - `Divorce`: Triggered when a divorce is filed.
    - `CertificateCreated`: Emitted when a new certificate is created.
    - `DivorceFiled`: Emitted when a divorce is filed through the factory.

### Functionality

- **WeddingCertificate**:
    - Constructor initializes the wedding details.
    - `getWeddingDetails` returns all relevant information.
    - `fileForDivorce` changes the divorce status and emits an event.
- **WeddingCertificateFactory**:
    - `createCertificate` creates a new `WeddingCertificate`.
    - `getCertificatesCount` returns the total number of certificates.
    - `getCertificate` retrieves details of a specific certificate.
    - `fileDivorce` facilitates the divorce process for a certificate.

### Deployment and Testing

- The contracts were deployed on the Sepolia testnet.
- Rigorous testing ensured functionality, security, and efficiency.

### Conclusion

The project successfully delivered a blockchain-based system for recording and managing marital unions. The system is secure, transparent, and immutable, leveraging the strengths of blockchain technology. Future enhancements could include integration with external databases and user interfaces for easier interaction.

## Web Interface for Blockchain-Based Wedding Certificate System Part

### Overview

The second phase of the project involved designing a user-friendly web interface for the blockchain-based wedding certificate system. This interface allows couples to (a) submit their names and receive a smart contract address on the blockchain, and (b) verify their names in the blockchain by submitting the smart contract address.

### Objectives

1. **User Interface Development**: To create an intuitive and responsive web interface for interacting with the blockchain.
2. **Integration with Blockchain**: To connect the web interface with the Ethereum blockchain for smart contract interactions.

### Web Interface Components

#### 1. Frontend (`index.html`)

- **Purpose**: Provides the user interface for interaction.
- **Features**:
    - Responsive design for various devices.
    - Sections for creating a new wedding certificate and checking an existing one.
    - Inputs for partner names, wedding date, and children.
    - Display of MetaMask connected account.
    - Debugging information and current block number display.

#### 2. Backend (`app.js`)

- **Purpose**: Handles the logic for interacting with the Ethereum blockchain.
- **Features**:
    - Initialization of Web3 and connection to MetaMask.
    - Functions to create a wedding certificate, verify certificate details, and file for divorce.
    - Event listeners for user actions.
    - Debugging area updates for transaction statuses.

#### 3. Styling (`style.css`)

- **Purpose**: Enhances the visual appeal and usability of the web interface.
- **Features**:
    - Stylish and readable fonts.
    - Background image for aesthetic appeal.
    - Responsive design for better accessibility on different devices.
    - Consistent color scheme and element styling.

### Functionality

- **Creating a Wedding Certificate**:
    - Users input partner names, wedding date, and children.
    - On submission, a transaction is sent to the blockchain.
    - The smart contract address is displayed upon successful creation.
    - ![Capture1.PNG](https://example.com/Capture1.png)
- **Verifying a Wedding Certificate**:
    - Users input the certificate's smart contract address.
    - The interface displays the details stored in the blockchain.
    - ![Capture2.PNG](https://example.com/Capture2.png)
- **Filing for Divorce**:
    - Users can file for divorce using the certificate's smart contract address.
    - The interface updates the divorce status upon successful transaction.
    - ![Capture3.PNG](https://example.com/Capture3.png)

### User Experience

- **Ease of Use**: The interface is designed to be intuitive, guiding users through each step.
- **Feedback Mechanisms**: Users receive immediate feedback on the status of their transactions.
- **Aesthetic Design**: The interface is visually appealing, enhancing user engagement.

### Challenges and Solutions

- **Challenge**: Ensuring seamless integration with the blockchain.
- **Solution**: Utilized Web3.js for robust and reliable blockchain interactions.

### Conclusion

The web interface successfully bridges the gap between users and the blockchain-based wedding certificate system. It offers an easy-to-use platform for couples to immortalize their union on the blockchain and verify their contract details. Future enhancements could include more interactive elements and expanded functionalities.
