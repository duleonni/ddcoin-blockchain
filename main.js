const SHA256 = require('crypto-js/sha256');


// Block basic informations

class Block{
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = "0";
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Mined block: " + this.hash);
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
	}


// First block

	createGenesisBlock(){
		return new Block(0, "27/10/2017 - 18:00", "Genesis block", "0");
	}


// Returns latest block in the chain

	getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }


// Adding new block in the chain

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}


// Verifying chain

	isChainValid(){
		for(let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true;
	}
}


// Print validation of blockchain

console.log('Verifying blockchain... ' + DDCoin.isChainValid());

// Starting blockchain

let DDCoin = new Blockchain();

console.log('Mining block 1...');
DDCoin.addBlock(new Block(1, "27/10/2017 - 18:30", { amount: 26}));
console.log('Mining block 2...');
DDCoin.addBlock(new Block(2, "27/10/2017 - 22:41", { amount: 26}));
console.log('Mining block 3...');
DDCoin.addBlock(new Block(3, "28/10/2017 - 03:05", { amount: 26}));
console.log('Mining block 4...');
DDCoin.addBlock(new Block(4, "28/10/2017 - 14:45", { amount: 26}));


// Print blockchain

//console.log(JSON.stringify(DDCoin, null, 2)); 
