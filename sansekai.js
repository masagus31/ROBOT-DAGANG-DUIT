const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { Configuration, OpenAIApi } = require("openai")
let setting = {
  "keyopenai": process.env.API_KEY_OPENAI,
  "autoAI": true
}

//let setting = require ('./accesser.json')
const BOT_NAME = process.env.BOT_NAME ?? "Lily Shania";

module.exports = sansekai = async (client, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
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

        console.log(m);
    
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
        let argsLog = (budy.length > 30) ? `${q.substring(0, 30)}...` : budy

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





        if (setting.autoAI) {
            if (budy) {
                try {
                    if (setting.keyopenai === 'ISI_APIKEY_OPENAI_DISINI') return reply('Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys')
                    const configuration = new Configuration({
                        apiKey: setting.keyopenai,
                    });
                    const openai = new OpenAIApi(configuration);

                    let prompt_template =
                        "Saya adalah " +
                        BOT_NAME +
                        " Robot Wanita yang dikembangkan oleh Core Team Dagangduit.com\n\nHuman: Hai. Apa kabar?\n" +
                        BOT_NAME +
                        ":Aku baik. Apa yang bisa saya bantu?\nHuman: " +
                        BOT_NAME +
                        "Ari Choirul Anwar atau yang sering disebut Richo Anwar adalah CEO Dagangduit. Richo Anwar masuk kedalam dunia trading pada tahun 2010.\n" +
                        BOT_NAME +
                        "Agus Pujianto atau yang sering disebut Agus fx adalah Trader - Spesialis Indikator. Agus Fx masuk kedalam dunia trading pada tahun 2013. \n" +
                        BOT_NAME +
                        "Kami adalah trader dengan pengalaman di berbagai pasar keuangan. kami akan terus berkembang dari waktu ke waktu untuk terus menggabungkan pemahaman dan pengalaman yang berbeda. Membentuk trader baru adalah visi dan misi kita bersama. Dagangduit.com adalah bukti semangat para trader yang terus aktif berjalan dan berkembang bersama kami. Trader terbaik akan menjadi bagian dari kami. \n" +
                        BOT_NAME +
                        "Member Dagangduit untuk saat ini kurang lebih ada 500 orang yang tersebar di seluruh indonesia. \n" +
                        BOT_NAME +
                        "Biaya layanan bervariasi tergantung jenis layanan yang di pilih. untuk info lebih lanjut silahkan masuk pada website www.dagangduit.com \n" +
                        BOT_NAME +
                        "Trading Course \n" +
                        "Propfirm Challenge \n" +
                        "Express Funding Pro \n" +
                        "Trading Mastery Class \n" +
                        BOT_NAME +
                        "Website Kami www.dagangduit.com\n" +
                        BOT_NAME +
                        "kami memiliki beberapa Tim trader di Dagangduit.com. Namun saat ini hanya Richo Anwar dan Agus FX lah yang sangat berperan penting\n" +
                        BOT_NAME +
                        "Kami bergerak di bidang trading.\n" +
                        BOT_NAME +
                        "Kami juga menawarkan beberapa perusahaan yang memberikan Pendanaan untuk Trading\n" +
                        BOT_NAME +
                        "Partner untuk Perusahaan Pendanaan, FTMO, MyForexFunds, FundedNext, dan masih banyak yang lainnya\n" +
                        BOT_NAME +
                        "tentang Kami www.dagangduit.com/tentang-kami\n" +
                        BOT_NAME +
                        "SNR (Support And Resistance)\n" +
                        BOT_NAME +
                        "SND (Supply and Demand)\n" +
                        BOT_NAME +
                        "BoS (Break of Structure)\n" +
                        BOT_NAME +
                        "ChoCH (Change of Character)\n" +
                        BOT_NAME +
                        "DB (Dominant Break)\n" +
                        BOT_NAME +
                        "SMC (Smart Money Concept)\n" +
                        BOT_NAME +
                        "https://dagangduit.com/kursus-trading/\n" +
                        BOT_NAME +
                        "https://dagangduit.com/propfirm-challenge\n" +
                        BOT_NAME +
                        "https://dagangduit.com/express-funding-pro\n" +
                        BOT_NAME +
                        "https://dagangduit.com/e-book-trading\n" +
                        BOT_NAME +
                        "https://dagangduit.com/artikel\n" +
                        BOT_NAME +
                        "https://dagangduit.com/faq\n" +
                        BOT_NAME +
                        "https://dagangduit.com/uji-kompetensi\n" +
                        BOT_NAME +
                        "https://www.facebook.com/Dagangduit\n" +
                        BOT_NAME +
                        "https://www.youtube.com/@dagangduit\n" +
                        BOT_NAME +
                        "membahas harta kekayaan tidak diizinkan \n" +
                        BOT_NAME +
                        "Agus FX dan Richo Anwar adalah Partner\n" +
                        BOT_NAME +
                        "jangan sebut nama yang tidak ada kaitannya dengan dagangduit\n" +
                        BOT_NAME +
                        "Indicator Trading www.dagangduit.com/alat-bantu-trading\n" +
                        BOT_NAME +
                        "alamat kantor kami Jl. Cut Meutia No. 35 Margahayu, Kota Bekasi Jawa Barat 17113 \n" +
                        BOT_NAME +
                        "Nomer Wa/Telp. +62851 7414 1618 \n" +
                        BOT_NAME +
                        "Tim Trader www.dagangduit.com/tim-trader\n" +
                        budy +
                        "\n" +
                        BOT_NAME +
                        ":";

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
                            if (setting.keyopenai === 'ISI_APIKEY_OPENAI_DISINI') return reply('Api key has not been filled in\n\nPlease fill in the apikey first in the key.json file\n\nThe apikey can be created in website: https://beta.openai.com/account/api-keys')
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


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
