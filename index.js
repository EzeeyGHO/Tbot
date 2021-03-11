const Discord = require("discord.js")
const Canvas = require("Canvas")
const Client = new Discord.Client()
client.login(process.env.TOKEN)

client.on("guildMemberAdd", async message => {
  const welcomeChannel = message.guild.channels.cache.get("814981027818242060")
  if(!welcome) return
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = 70;

    do {
      ctx.font = `${fontSize -= 10}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
  };

  const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${message.user.username}!`);
	ctx.fillStyle = '#DC143C';
	ctx.fillText(`${message.user.username}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(message.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	welcomeChannel.send(attachment);
})
