let handler = m => m

handler.before = async function (m) {
    let user = db.data.users[m.sender]
    let teks = `Hai ${m.name} waktu moderator kamu sudah habis, jika ingin berlangganan moderator lagi silahkan hubungi: @${owner[0]+'@s.whatsapp.net'} terimakasih:)`
    if (m.chat.endsWith('broadcast')) return
    if (user.moderatorTime != 0 && user.moderator) {
        if (new Date() * 1 >= user.moderatorTime) {
            this.reply2(m.sender, teks, null, {mentions: this.parseMention(teks)})
            const json = JSON.parse(fs.readFileSync('./src/moderator.json'))
            let index = json.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
            if (json.includes(who)) throw false 
            json.splice(index, 1)
            fs.writeFileSync('./src/moderator.json', JSON.stringify(json))
            user.moderatorTime = 0
            user.moderator = false
        }
    }
}

module.exports = handler
