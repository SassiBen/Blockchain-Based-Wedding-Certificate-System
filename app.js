let web3;
let factoryContract;
let selectedAccount;

const factoryABI = [X]; 
const certificateABI = [Y];

const factoryAddress = '@Contract';

window.addEventListener('load', () => {
    initWeb3();
});

function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                selectedAccount = accounts[0];
                document.getElementById('connectedAccount').textContent = selectedAccount;
                initContracts();
            })
            .catch(error => {
                updateDebugArea("User denied account access: " + error.message);
            });

        window.ethereum.on('accountsChanged', (accounts) => {
            selectedAccount = accounts[0];
            document.getElementById('connectedAccount').textContent = selectedAccount;
            updateDebugArea("MetaMask Account Changed: " + selectedAccount);
        });
    } else {
        updateDebugArea('Non-Ethereum browser detected. Consider trying MetaMask!');
    }
}


function initContracts() {
    factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);
}

document.getElementById('createCertificate').addEventListener('click', () => {
    const partner1 = document.getElementById('partner1').value;
    const partner2 = document.getElementById('partner2').value;
    const day = parseInt(document.getElementById('weddingDay').value);
    const month = parseInt(document.getElementById('weddingMonth').value);
    const year = parseInt(document.getElementById('weddingYear').value);
    const children = document.getElementById('children').value;
    createWeddingCertificate(partner1, partner2, day, month, year, children);
});

document.getElementById('verifyCertificate').addEventListener('click', () => {
    const certificateAddress = document.getElementById('certificateAddress').value;
    verifyCertificate(certificateAddress);
});

document.getElementById('fileDivorce').addEventListener('click', () => {
    const certificateAddress = document.getElementById('certificateAddress').value;
    fileForDivorce(certificateAddress);
});

function createWeddingCertificate(partner1, partner2, day, month, year, children) {
    document.getElementById('creationStatus').textContent = 'Creating...';
    document.getElementById('newCertificateAddress').textContent = '-';

    factoryContract.methods.createCertificate(partner1, partner2, day, month, year, children)
        .send({ from: selectedAccount })
        .on('transactionHash', hash => {
            updateDebugArea('Transaction Hash: ' + hash);
            document.getElementById('creationStatus').textContent = 'Transaction sent. Waiting for confirmation...';
        })
        .on('receipt', receipt => {
            updateDebugArea('Transaction successful with receipt: ' + JSON.stringify(receipt));
            document.getElementById('creationStatus').textContent = 'Certificate Created';
            if (receipt.events && receipt.events.CertificateCreated && receipt.events.CertificateCreated.returnValues) {
                const newCertificateAddr = receipt.events.CertificateCreated.returnValues.certificateAddress;
                document.getElementById('newCertificateAddress').textContent = newCertificateAddr;
            }
        })
        .on('error', error => {
            updateDebugArea('Error in transaction: ' + error.message);
            document.getElementById('creationStatus').textContent = 'Error during creation';
        });
}


function verifyCertificate(certificateAddress) {
    const certificateContract = new web3.eth.Contract(certificateABI, certificateAddress);
    certificateContract.methods.getWeddingDetails().call()
        .then(result => {
            document.getElementById('displayPartner1').textContent = result[0];
            document.getElementById('displayPartner2').textContent = result[1];
            document.getElementById('displayWeddingDate').textContent = result[2] + '-' + result[3] + '-' + result[4];
            document.getElementById('displayChildren').textContent = result[5];
            document.getElementById('displayDivorceStatus').textContent = result[6] ? "Divorced" : "Married";
            updateDebugArea('Certificate Details Retrieved');
        })
        .catch(error => {
            updateDebugArea("Error Verifying Certificate: " + error.message);
        });
}

function fileForDivorce(certificateAddress) {
    document.getElementById('filingStatus').textContent = 'Filing for divorce...';

    const certificateContract = new web3.eth.Contract(certificateABI, certificateAddress);
    certificateContract.methods.fileForDivorce()
        .send({ from: selectedAccount })
        .on('transactionHash', hash => {
            updateDebugArea('Transaction Hash: ' + hash);
            document.getElementById('filingStatus').textContent = 'Transaction sent. Waiting for confirmation...';
        })
        .on('receipt', receipt => {
            updateDebugArea('Divorce filed successfully with receipt: ' + JSON.stringify(receipt));
            document.getElementById('filingStatus').textContent = 'Divorce Filed Successfully';
        })
        .on('error', error => {
            updateDebugArea('Error in transaction: ' + error.message);
            document.getElementById('filingStatus').textContent = 'Error filing for divorce';
        });
}


function displayCurrentBlockNumber() {
    web3.eth.getBlockNumber()
        .then(blockNumber => {
            document.getElementById('currentBlockNumber').textContent = blockNumber;
        })
        .catch(error => {
            updateDebugArea("Error fetching current block number: " + error.message);
        });
}

function updateDebugArea(message) {
    const debugArea = document.getElementById('debugArea');
    debugArea.value += message + '\n';
    debugArea.scrollTop = debugArea.scrollHeight;
}

window.addEventListener('load', () => {
    initWeb3();
    setInterval(displayCurrentBlockNumber, 5000);
});