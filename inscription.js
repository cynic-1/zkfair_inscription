const ethers = require('ethers');

require('dotenv').config();
// console.log(ethers);
// 替换成你的私钥
const privateKey = process.env.PRIVATE_KEY;
const gasPrice = ethers.utils.parseUnits(process.env.GASPRICE, 'gwei');

// RPC节点URL
const rpcUrl = 'https://rpc.zkfair.io/';

// 使用给定的RPC节点初始化provider
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

// 通过私钥和provider创建钱包实例
const wallet = new ethers.Wallet(privateKey, provider);

// 发送交易的函数
async function sendTransaction() {
  // 获取钱包地址
  const walletAddress = wallet.address;

  const data = '0x646174613a2c7b2270223a226672632d3230222c226f70223a226d696e74222c227469636b223a2266616972222c22616d74223a2231303030303030227d'

  // 设置交易的参数
  const tx = {
    to: walletAddress, // 接收者地址设置为钱包自身地址
    value: ethers.utils.parseEther('0'), // 转账金额
    data: data,
    gasPrice: gasPrice,
  };

  try {
    // 发送交易
    const transactionResponse = await wallet.sendTransaction(tx);
    console.log(`Transaction successful with hash: ${transactionResponse.hash}`);

    // 等待交易被挖出
    await transactionResponse.wait();
    console.log('Transaction confirmed.');
  } catch (error) {
    console.error(`Transaction failed: ${error.message}`);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 设置发送交易的间隔（例如：每10秒发送一次）
const interval = getRandomInt(10000, 30000); // 10秒

// 持续发送交易
setInterval(() => {
  sendTransaction();
}, interval);
