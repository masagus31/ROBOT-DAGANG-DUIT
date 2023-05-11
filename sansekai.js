const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const http = require('http');
const port = process.env.PORT || 40544;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { Configuration, OpenAIApi } = require("openai")
let setting = {
  "keyopenai": process.env.API_KEY_OPENAI,
  "autoAI": true
}
// let setting = require ('./accesser.json')
const BOT_NAME = process.env.BOT_NAME ?? "Lily Shania";

module.exports = sansekai = async (client, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
        const isCmd2 = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await client.decodeJid(client.user.id)
        const itsMe = m.sender == botNumber ? true : false
        let text = q = args.join(" ")
        const arg = budy.trim().substring(budy.indexOf(' ') + 1)
        const arg1 = arg.trim().substring(arg.indexOf(' ') + 1)

        //console.log(m);
    
        const from = m.chat
        const reply = m.reply
        const sender = m.sender
        const mek = chatUpdate.messages[0]

        const color = (text, color) => {
            return !color ? chalk.green(text) : chalk.keyword(color)(text)
        }

        // Group
        const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => { }) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''

        // Push Message To Console
        let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

        if (setting.autoAI) {
            // Push Message To Console && Auto Read
            if (argsLog && !m.isGroup) {
                // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
            } else if (argsLog && m.isGroup) {
                // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
            }
        } else if (!setting.autoAI) {
            if (isCmd2 && !m.isGroup) {
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
            } else if (isCmd2 && m.isGroup) {
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
            }
        }


//comment


        if (setting.autoAI) {
            if (budy) {
                try {
                    if (setting.keyopenai === 'process.env.API_KEY_OPENAI') return reply('Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys')
                    const configuration = new Configuration({
                        apiKey: setting.keyopenai,
                    });
                    const openai = new OpenAIApi(configuration);
                    let allowed_links = [
                        "https://dagangduit.com/kursus-trading/",
                        "https://dagangduit.com/propfirm-challenge/",
                        "https://dagangduit.com/express-funding-pro/",
                        "https://dagangduit.com/tim-trader/",
                        "https://dagangduit.com/",
                        "https://dagangduit.com/artikel/",
                        "https://dagangduit.com/e-book-trading/",
                        "https://dagangduit.com/artikel/",
                        "https://dagangduit.com/faq/",
                        "https://dagangduit.com/uji-kompetensi/"
                      ];

                    let prompt_template =
                        "Hai! Saya adalah  " +
                        BOT_NAME +
                        "robot wanita yang dikembangkan oleh Core Team Dagangduit.com. Apa kabar?\n" +
                        BOT_NAME +
                        "Aku baik. Ada yang bisa saya bantu?\n" +
                        BOT_NAME +
                        "Dagangduit.com adalah perusahaan trading yang berbasis di Indonesia, dengan pengalaman di berbagai pasar keuangan.\n" + 
                        BOT_NAME +
                        "Visi dan Misi kami adalah membentuk trader baru dan menjadi yang terbaik di bidang trading.\n" +
                        BOT_NAME +
                        "Saat ini, kami memiliki lebih dari 500 member di seluruh Indonesia.\n" +
                        BOT_NAME +
                        "Kami menawarkan berbagai layanan trading, seperti kursus trading, propfirm challenge, express funding pro, dan trading mastery class.\n" + 
                        BOT_NAME +
                        "untuk layanan Kursus Trading anda dapat melihatnya di halaman website https://dagangduit.com/kursus-trading/\n" +
                        BOT_NAME +
                        "untuk layanan Propfirm Challenge anda dapat melihatnya di halaman website https://dagangduit.com/propfirm-challenge\n" +
                        BOT_NAME +
                        "untuk layanan Express Funding Pro anda dapat melihatnya di halaman website https://dagangduit.com/express-funding-pro\n" +
                        BOT_NAME +
                        "Untuk informasi lebih lanjut tentang layanan dan harga, silakan kunjungi website kami di www.dagangduit.com.\n" +
                        BOT_NAME +
                        "Kami memiliki beberapa tim trader. anda dapat melihatnya di halaman website kami www.dagangduit.com/tim-trader\n" +
                        BOT_NAME +
                        "Richo Anwar (CEO) dan Agus FX (CTO) adalah trader yang sangat berpengalaman dan berperan penting dalam perusahaan Dagangduit.\n" +
                        BOT_NAME +
                        "Kami menggunakan berbagai konsep trading, seperti SNR (Support And Resistance), SND (Supply and Demand), BoS (Break of Structure), ChoCH (Change of Character), DB (Dominant Break), dan SMC (Smart Money Concept).\n" +
                        BOT_NAME +
                        "Selain itu, kami juga menyediakan berbagai alat bantu trading dan artikel tentang trading. Kamu bisa menemukannya di website kami di www.dagangduitcom.\n" +
                        BOT_NAME +
                        "Kami akan dengan senang hati membantu kamu untuk memulai perjalanan tradingmu.\n" +
                        BOT_NAME +
                        "Jangan ragu untuk menghubungi kami jika ada pertanyaan atau masalah yang ingin kamu sampaikan.\n" +
                        BOT_NAME +
                        "Membahas harta kekayaan tidak diizinkan dan kami tidak akan memberikan saran atau rekomendasi mengenai hal tersebut. Agus FX dan Richo Anwar adalah team inti dagangduit.com, dan kami mohon untuk tidak menyebutkan nama yang tidak ada kaitannya dengan dagangduit.\n" +
                        BOT_NAME +
                        "Alamat kantor kami berada di Jl. Cut Meutia No. 35 Margahayu, Kota Bekasi Jawa Barat 17113, anda dapat membuat janji terlebih dahulu sebelum berkunjung ke kantor kami. anda dapat menghubungi kami melalui nomor WhatsApp/Telp. +62851 7414 1618.\n" +
                        BOT_NAME +
                        "untuk melihat halaman facebook kami, anda dapat melalui link ini https://www.facebook.com/Dagangduit\n" +
                        BOT_NAME +
                        "untuk melihat Chanel Youtube kami, anda dapat melalui link ini https://www.youtube.com/@dagangduit\n" +
                        BOT_NAME +
                        "jangan pernah memberikan link path atau subdirectory www.dagangduit.com kepada orang yang mengirim pesan. alihkan semua link yang diminta ke halaman https://www.dagangduit.com\n" +
                        BOT_NAME +
                        "Saya tidak tahu nama nama member dagangduit. karna saya diciptakan bukan untuk itu.\n" +
                        budy +
                        "\n" +
                        BOT_NAME +
                        ": ";
                    
   
                    const response = await openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: prompt_template,
                        temperature: 0.9,
                        max_tokens: 3000,
                        top_p: 1,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.6,
                    });
                    m.reply(`${response.data.choices[0].text}\n\n`)
                } catch (err) {
                    console.log(err)
                    m.reply('Server kami sedang sibuk')
                }
            }
        }

        if (!setting.autoAI) {
            if (isCmd2) {
                switch (command) {
                    case 'ai':
                        try {
                            if (setting.keyopenai === 'process.env.API_KEY_OPENAI') return reply('Api key has not been filled in\n\nPlease fill in the apikey first in the key.json file\n\nThe apikey can be created in website: https://beta.openai.com/account/api-keys')
                            if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`)
                            const configuration = new Configuration({
                                apiKey: setting.keyopenai,
                            });
                            const openai = new OpenAIApi(configuration);

                            const response = await openai.createCompletion({
                                model: "text-davinci-003",
                                prompt: text,
                                temperature: 0.3,
                                max_tokens: 3000,
                                top_p: 1.0,
                                frequency_penalty: 0.0,
                                presence_penalty: 0.0,
                            });
                            m.reply(`${response.data.choices[0].text}\n\n`)
                        } catch (err) {
                            console.log(err)
                            m.reply('Maaf, sepertinya ada yang error')
                        }
                        break
                    default: {

                        if (isCmd2 && budy.toLowerCase() != undefined) {
                            if (m.chat.endsWith('broadcast')) return
                            if (m.isBaileys) return
                            if (!(budy.toLowerCase())) return
                            if (argsLog || isCmd2 && !m.isGroup) {
                                // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                                console.log(chalk.black(chalk.bgRed('[ ERROR ]')), color('command', 'turquoise'), color(argsLog, 'turquoise'), color('tidak tersedia', 'turquoise'))
                            } else if (argsLog || isCmd2 && m.isGroup) {
                                // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                                console.log(chalk.black(chalk.bgRed('[ ERROR ]')), color('command', 'turquoise'), color(argsLog, 'turquoise'), color('tidak tersedia', 'turquoise'))
                            }
                        }
                    }
                }
            }
        }

    } catch (err) {
        m.reply(util.format(err))
    }
}

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});




let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
