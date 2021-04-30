const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const { upload } = vk;
const fs = require("fs");
const child = require('child_process');
const { MessageContext } = require('vk-io');
const http = require('https');
const requests = require('request')
const path = require('path')

// ------------------------------------------------------------ \\

const acc = require("./manager/acc.json");
const uid = require("./manager/uid.json");
const chats = require("./manager/chats.json");

// ------------------------------------------------------------
setInterval(function(){
  fs.writeFileSync("./manager/acc.json", JSON.stringify(acc, null, "\t"));
  fs.writeFileSync("./manager/uid.json", JSON.stringify(uid, null, "\t"));
  fs.writeFileSync("./manager/chats.json", JSON.stringify(chats, null, "\t"));
}, 1000);

// Backup base

// ------------------------------------------------------------ \\

let user = new VK();
user.setOptions({
    token: 'токен юзера',
});

vk.setOptions({
    token: 'токен группы',
    apiMode: 'parallel',
  pollingGroupId: ID_Группы
});
// ------------------------------------------------------------ \\

async function GetIdUser(margs){
	margs = margs.replace("https://", "");
	margs = margs.replace("http://", "");
	margs = margs.replace("vk.com/", "[");
	margs = margs.replace("@", "");
	margs = margs.replace("*", "");
	margs = margs.replace("[", "");
	margs = margs.replace("]", "");
	margs = margs.replace("|", "");
	margs = margs.replace(/()(.*)/ig, '');

	let iii = await vk.api.call("utils.resolveScreenName", {
	screen_name: margs
	});

	let us = Number(iii.object_id)

	return us;
}

vk.updates.on(['chat_invite_user_by_link'], async (message, next) => {
     let count = 0;
         let user = await vk.api.users.get({user_id: message.payload.action.member_id})

     count += 1;

    if(count == 1){
    text += `@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name})`

    return message.send(`🙋‍♂ ${text} присоединился к беседе по ссылке`)
    }

   if(chats[message.chatId].motd){
    return message.send(`🗓 Приветствие:\n${chats[message.chatId].motd}`)
    }

   if(chats[message.chatId].users[message.senderId].tban >= 1){
   return message.send(`@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}) - находится в бане, до разбана ${timer(chats[message.chatId].users[message.payload.action.member_id].tban)}`);
   vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.payload.action.member_id })
}

  if(chats[message.chatId].users[message.senderId].permanently = true){
  return message.send(`@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}) - находится в вечном бане`);
  vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.payload.action.member_id })
}

    await next();
  });
 vk.updates.on(['chat_invite_user'], async (message, next) => {
         let user = await vk.api.users.get({user_id: message.payload.action.member_id})

    if(message.payload.action.member_id == -203605915){
      message.send(`‍Приветствую! Для моей полноценной работы нужно нажать на название беседы и кликнуть по кнопке «Назначить администратором» напротив  [vognemabot|Клубничка | Чат-менеджер].`,
      {
      attachment: 'photo-203605915_457239043'
      });

    }
    if(message.payload.action.member_id > 0){

      if(chats[message.chatId].users[message.senderId].tban >= 1){
      message.send(`@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}) - находится в бане, до разбана ${timer(chats[message.chatId].users[message.payload.action.member_id].tban)}`);
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.payload.action.member_id })
   }

  /* if(chats[message.chatId].users[message.senderId].permanently = true){
   vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.payload.action.member_id })
   return message.send(`@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}) - находится в вечном бане`);
 }*/

   if(chats[message.chatId].settings.invite == false){
    let user = await vk.api.users.get({user_id: message.payload.action.member_id})

    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.payload.action.member_id })

    message.send(`@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}), исключен.\n Администратор запретил приглашать в беседу.`)
    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
   }

   if(chats[message.chatId].settings.invite == true){
    let count = 0;
    let text = ``;
   let user = await vk.api.users.get({user_id: message.payload.action.member_id})
  count += 1;

    if(count == 1){
    text += `@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name})`

    return message.send(`🙋‍♂ ${text} присоединился к беседе`)
    }

    if(count < 2){
     text += `@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name})`
    return message.send(`🙋‍♂ ${text} присоединился к беседе`)
   }

   if(chats[message.chatId].motd){
   return message.send(`🗓 Приветствие:\n${chats[message.chatId].motd}`)
   }

    if(message.payload.action.member_id < 0){

     if(chats[message.chatId].settings.protectgroup1 == true){
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.payload.action.member_id })
      message.send(`[SYSTEM] => PROTECTION GROUP: INCLUDED\n&#8195;[SUCCESS] => THE GROUP WAS DELETED`)
     }

    if(chats[message.chatId].settings.protectgroup1 == false){
      vk.api.groups.getById({ group_ids: message.payload.action.member_id, fields: "city,country,place,description,wiki_page,market,members_count,counters,start_date,finish_date,can_post,can_see_all_posts,activity,status" }).then(function(response){
      let c = response[0];
      if(!chats[message.chatId].groups[message.payload.action.member_id]){
         chats[message.chatId].groups[message.payload.action.member_id] = {
           id: "-"+ message.payload.action.member_id,
           name: c.name,
           sname: c.screen_name,
           msg: 0,
           symbols: 0,
           warns: 0,
           timeban: 0,
           ban: false,
           permban: false
         }
      }
      })
     }

    }
  }
}

    await next();

  });

  vk.updates.on(['chat_pin_message'], async (message, next) => {
      let user = await vk.api.users.get({user_id: message.payload.action.member_id})
      if(chats[message.chatId].users[message.payload.action.member_id].group < 1)
      message.send(`🔔 Информация из беседы «${chats[message.chatId].title}»\n📝 Тип события: Открепление/закрепление сообщения\n👷 Участник беседы, который получил наказание @id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name})`)
  });

  vk.updates.on(['chat_unpin_message'], async (message, next) => {
      let user = await vk.api.users.get({user_id: message.payload.action.member_id})
      if(chats[message.chatId].users[message.payload.action.member_id].group < 1)
      message.send(`🔔 Информация из беседы «${chats[message.chatId].title}»\n📝 Тип события: Открепление/закрепление сообщения\n👷 Участник беседы, который получил наказание @id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name})`)

  });

  vk.updates.on(['chat_title_update'], async (message, next) => {
      let user = await vk.api.users.get({user_id: message.payload.action.member_id})
      if(chats[message.chatId].users[message.payload.action.member_id].group < 1)
      message.send(`🔔 Информация из беседы «${chats[message.chatId].title}»\n📝 Тип события: Изменение названия беседы\n👷 Участник беседы, который получил наказание @id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name})`)

  });

  vk.updates.on(['chat_photo_update'], async (message, next) => {
      let user = await vk.api.users.get({user_id: message.payload.action.member_id})
      if(chats[message.chatId].users[user].group < 1)
      message.send(`🔔 Информация из беседы «${chats[message.chatId].title}»\n📝 Тип события: Удаление/смена фотографии\n👷 Участник беседы, который получил наказание @id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name})`)

  });

  vk.updates.on(['chat_photo_remove'], async (message, next) => {
      let user = await vk.api.users.get({user_id: message.payload.action.member_id})
      if(chats[message.chatId].users[message.payload.action.member_id].group < 1)
      message.send(`🔔 Информация из беседы «${chats[message.chatId].title}»\n📝 Тип события: Удаление/смена фотографии\n👷 Участник беседы, который получил наказание @id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name})`)

  });

vk.updates.on(['chat_invite_user'], async (message, next) => {
    if(message.payload.action.member_id > 0){

   if(chats[message.chatId].settings.invite == false){
    let user = await vk.api.users.get({user_id: message.payload.action.member_id})

    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.payload.action.member_id })

    message.send(`@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}), исключен.\nМладший администратор запретил приглашать в беседу.`)
    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
   }

   if(chats[message.chatId].settings.invite == true){
    let count = 0;
    let text = ``;
   let user = await vk.api.users.get({user_id: message.payload.action.member_id})
  count += 1;

    if(count == 1){
    text += `@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}), `

    return message.send(`${text}${chats[message.chatId].motd}`)
    }

    if(count < 2){
     text += `@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}), `

    return message.send(`${text}${chats[message.chatId].motd}`)
   }
    }
  }

    if(message.payload.action.member_id < 0){

     if(chats[message.chatId].settings.protectgroup1 == true){
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.payload.action.member_id })
      message.send(`Включён запрет на приглашение групп.`)
     }

    if(chats[message.chatId].settings.protectgroup1 == false){

      let group = await vk.api.groups.getById({ group_id: Math.abs(message.payload.action.member_id), fields: "city,country,place,description,wiki_page,market,members_count,counters,start_date,finish_date,can_post,can_see_all_posts,activity,status" })

        if(!chats[message.chatId].groups[message.payload.action.member_id]){
               chats[message.chatId].groups[message.payload.action.member_id] = {
                  id: Math.abs(message.payload.action.member_id) ,
                  name: group[0].name,
                  sname: group[0].screen_name,
                  msg: 0,
                  warns: 0,
                  ban: false,
                  permban: false
              }
          }
     }
    }

    await next();

  });

   vk.updates.on(['chat_kick_user'], async (message, next) => {
let [user_info] = await vk.api.users.get({user_id: message.eventMemberId})

if(message.eventMemberId == message.senderId) {
if(chats[message.chatId].users[message.eventMemberId].group == 0){
if(chats[message.chatId].settings.kick_leave == true){
message.send(`[SYSTEM] » Пользователь @id${message.eventMemberId} (${user_info.first_name} ${user_info.last_name}) покинул беседу и был исключён `);
vk.api.call('messages.removeChatUser', { chat_id: message.chatId, user_id: message.eventMemberId })
chats[message.chatId].users[message.senderId].group = 0
}
if( chats[message.chatId].settings.kick_leave == false){
chats[message.chatId].users[message.senderId].leave = true
chats[message.chatId].users[message.senderId].group = 0
message.send(`[🔰] » Пользователь @id${message.eventMemberId} (${user_info.first_name} ${user_info.last_name}) покинул беседу`);
}
} else {

chats[message.chatId].users[message.senderId].leave = true
chats[message.chatId].users[message.senderId].group = 0
message.send(`[🔰] » Пользователь @id${message.eventMemberId} (${user_info.first_name} ${user_info.last_name}) покинул беседу`);
}
}

await next();
});
vk.updates.on(['chat_title_update'], async (message, next) => {

let user = await vk.api.users.get({user_id: message.eventMemberId})

 if(chats[message.chatId].users[message.senderId].group == 0){
   message.send(`[❌] » @id${message.eventMemberId} (Пользователь), ваш уровень Админ Прав маленький для смены название беседы `);
  vk.api.call('messages.editChat', { chat_id: message.chatId, title: chats[message.chatId].title })
}
      await next();
      });
console.log('Manager Active');
vk.updates.startPolling();
vk.updates.use(async (message, next, text) => {
    if (message.is("message") && message.isOutbox)
        return;

    message.user = message.senderId;


   if(chats[message.chatId]){ m = chats[message.chatId].users[message.user]; }

  if(Number(message.senderId) <= 0) return;
  if(/\[club203605915\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club203605915\|(.*)\]/ig, '').trim();

if(chats[message.chatId]){
 if(chats[message.chatId].users[message.user]){
   message.attachments.map(function(a) {
    if (a.type == 'photo') {
        chats[message.chatId].photos += 1
        chats[message.chatId].users[message.user].stats.photos += 1
    } else if (a.type == 'sticker') {
        chats[message.chatId].stikers += 1
        chats[message.chatId].users[message.user].stats.stikers += 1
    } else if (a.type == 'video') {
        chats[message.chatId].videos += 1
        chats[message.chatId].users[message.user].stats.videos += 1
    } else if (a.type == 'audio') {
        chats[message.chatId].audios += 1
        chats[message.chatId].users[message.user].stats.audios += 1
    } else if (a.type == 'wall') {
        chats[message.chatId].wall_posts += 1
        chats[message.chatId].users[message.user].stats.wall_posts += 1
    } else if (a.type == 'doc') {
        chats[message.chatId].documents += 1
       chats[message.chatId].users[message.user].stats.documents += 1
    } else if (a.type == 'audio_message') {
        chats[message.chatId].audio_messages += 1
       chats[message.chatId].users[message.user].stats.audio_messages += 1
    }
});
 }
}


   if(!chats[message.chatId]) {
    chats[message.chatId] = {
           activate: false,
            motd: "",
            name: 0,
            flood: 0,
            prefix: "/",
            banlength: 0,
            owner: 0,
            owname: ``,
            tex: false,
            count: 0,
            smilemsg: 0,
            commsg: 0,
            matmsg: 0,
            symbols: 0,
            forwarded_messages: 0,
            photos: 0,
            videos: 0,
            audios: 0,
            stikers: 0,
            wall_posts: 0,
            documents: 0,
            audio_messages: 0,
            dostup: {
              warn: 1,
              unwarn: 1,
              ban: 3,
              unban: 3,
              permban: 4,
              kick: 2,
              prefix: 3,
              event: 3,
              setrules: 3,
              Администратор: 4,
              admin: 3,
              moder: 3,
              user: 3,
              tex: 3,
              detail: 2,
              chatcfg: 3,
              symbols: 3,
              warns: 3,
              tempban: 3,
              motd: 3
            },
            bgold: false,
            setting: {
             symbols: 800,
             warns: 3
            },
            settings: {
              url: false,
              invite: true,
              kick_leave: false,
              mute: false,
              protectgroup1: false
            },
       rules: "Правила не установлены",
       title: "none",
            key: `${randomUid()}`,
         banned: [],
           lastname: {},
         groups: {},
           invites: {},
           names: [],
         users: {}
    }
    chats[message.chatId].motd = "Добро пожаловать в беседу, чтобы узнать правила, напишите "+ chats[message.chatId].prefix +"rules";
  }


vk.api.messages.getConversationMembers({ peer_id: message.peerId, fields: "id", group_id: 203605915 }).then(function(response){
let c = response;
c.items.map(function(c){
if(c.member_id < 1) return;
 vk.api.call('users.get', {
  user_ids: c.member_id,
  fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen,first_name"
    }).then(res => {
     let user = res[0];
     if(!chats[message.chatId].users[c.member_id]){
        chats[message.chatId].users[c.member_id] = {
                  id: c.member_id,
                  name: `${user.first_name} ${user.last_name}`,
                  warns: 0,
                  active: 0,
                  uinvite: 0,
				  scam: 0,
                  uchat: true,
                  chatdata: `${data()}`,
                  leave: false,
                  top: false,
                   stats: {
                     msg: 0,
                     smilemsg: 0,
                     commsg: 0,
                     matmsg: 0,
                     symbols: 0,
                     forwarded_messages: 0,
                     photos: 0,
                     videos: 0,
                     audios: 0,
                     stikers: 0,
                     wall_posts: 0,
                     documents: 0,
                     audio_messages: 0
                  },
                  tban: 0,
                  ban: false,
                  isBanned: false,
                  permanently: false,
                  group: 0
           }
       }
       if(!acc.find(x=> x.id === message.senderId))
       {
       	     acc.push({
             number: acc.length,
             id: c.member_id,
             prefix: `${user.first_name} ${user.last_name}`,
             msg: 0,
             smilemsg: 0,
             matmsg: 0,
             commsg: 0,
             last_msg: false,
             ban: false,
             scam: 0,
             money: 0,
             role: 0,
             online: 0,
             rtime: `${time()} | ${data()}`
             })
       }
})
})
}).catch((error) => {
  message.send(`‍Приветствую! Для моей полноценной работы нужно нажать на название беседы и кликнуть по кнопке «Назначить администратором» напротив  [vognemabot|Клубничка | Чат-менеджер].`,
  {
  attachment: 'photo-203605915_457239043'
  });
});

vk.api.messages.getConversationMembers({ peer_id: message.peerId, fields: "id", group_id: 203605915 }).then(function(response){
let c = response;
c.groups.map(function(c){
  if(!chats[message.chatId].groups[-c.id]){
  chats[message.chatId].groups[-c.id] = {
    id: c.id,
    name: c.name,
    sname: c.screen_name,
    msg: 0,
    warns: 0,
    ban: false,
    permban: false
  }
}
})
})

vk.api.messages.getConversationMembers({ peer_id: message.peerId, fields: "id", group_id: 203605915 }).then(function(response){
let c = response;
c.items.map(function(c){
 if(c.member_id < 1) return;
 if(c.is_owner == true) return;
  if(!chats[message.chatId].invites[c.member_id]){
  chats[message.chatId].invites[c.member_id] = { invite: c.invited_by }
}
})
})

/*
vk.api.messages.getConversationsById({ peer_ids: message.peerId, extended: 0, group_id: 203605915 }).then(function(response){
let c = response;
c.items.map(function(c){
const file = fs.createWriteStream(path.join('/home/chatmanager/photos/photo'+ message.chatId +'.jpg'))
const request = http.get(`${c.chat_settings.photo.photo_200}`, function(response){
 response.pipe(file);
})
})
})
*/

vk.api.messages.getConversationMembers({ peer_id: message.peerId, fields: "id", group_id: 203605915 }).then(function(response){
let c = response;
c.items.map(function(c){
 if(c.member_id < 1) return;
 if (c.member_id = 35543922) {
 chats[message.chatId].users[c.member_id].group = 5
 } return;
 if (c.is_admin == true) {
 chats[message.chatId].users[c.member_id].group = 4
}
if (c.is_owner == true) {
   chats[message.chatId].owner = c.member_id
   vk.api.call('users.get', {
  user_ids: chats[message.chatId].owner,
  fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen,first_name"
    }).then(res => {
      chats[message.chatId].owname = `${res[0].first_name} ${res[0].last_name}`
   })
     chats[message.chatId].users[c.member_id].group = 5
    }
})
})

vk.api.messages.getConversationsById({ peer_ids: message.peerId, extended: 0, group_id: 203605915 }).then(function(response){
let c = response;
c.items.map(function(c){
 chats[message.chatId].title = `${c.chat_settings.title}`
})
})

 if(Number(message.senderId) <= 0){
    if(chats[message.chatId].setting.symbols <= message.text.length) {
      chats[message.chatId].users[message.user].warns += 1;
     if(chats[message.chatId].users[message.user].warns >= chats[message.chatId].setting.warns) {
       chats[message.chatId].users[message.user].reason = "Превышен лимит символов";
       chats[message.chatId].users[message.user].isBanned = true;
       chats[message.chatId].users[message.user].warns = 0;
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
   }
  message.send(`[❌] » Вы привысили лимит символов [${chats[message.chatId].setting.symbols}]\n[⚠] » Теперь у вас [${chats[message.chatId].users[message.user].warns}/${chats[message.chatId].setting.warns}] предупреждений`)
  }

  chats[message.chatId].groups[message.senderId].msg += 1;
 }

if(chats[message.chatId].users[message.user].group == 0){
if(chats[message.chatId].settings.mute == true){

var smiles = message.text.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g)
    if(smiles != null) {
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
  }

message.attachments.map(function(a) {
    if (a.type == 'photo') {
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'sticker') {
        vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'video') {
        vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'audio') {
       vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'wall') {
        vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'doc') {
       vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'audio_message') {
    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    }
});
 vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), нарушил режим тишины и был исключен`);
}
}

if(chats[message.chatId].users[message.user].group == 1){
if(chats[message.chatId].settings.mute == true){

    var smiles = message.text.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g)
    if(smiles != null) {
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

  }

    message.attachments.map(function(a) {
    if (a.type == 'photo') {
     vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'sticker') {
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'video') {
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'audio') {
     vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'wall') {
    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'doc') {
   vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    } else if (a.type == 'audio_message') {
    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })

    }
});
 vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), нарушил режим тишины и был исключен`);
}
}

/*if(chats[message.chatId].users[message.user].group == 0){

if(message.forwards[0].text.length <= 1200){
 chats[message.chatId].users[message.user].warns += 1;
if(chats[message.chatId].users[message.user].warns >= chats[message.chatId].setting.warns) {
  chats[message.chatId].users[message.user].reason = "Превышен лимит символов";
 chats[message.chatId].users[message.user].isBanned = true;
  chats[message.chatId].users[message.user].warns = 0;
  vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
}
 message.send(`[❌] » Вы привысили лимит символов [${chats[message.chatId].setting.symbols}]\n[⚠] » Теперь у вас [${chats[message.chatId].users[message.user].warns}/${chats[message.chatId].setting.warns}] предупреждений`)
}

if(message.replyMessage.text.length <= 1200){
 chats[message.chatId].users[message.user].warns += 1;
if(chats[message.chatId].users[message.user].warns >= chats[message.chatId].setting.warns) {
  chats[message.chatId].users[message.user].reason = "Превышен лимит символов";
 chats[message.chatId].users[message.user].isBanned = true;
  chats[message.chatId].users[message.user].warns = 0;
  vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
}
 message.send(`[❌] » Вы привысили лимит символов [${chats[message.chatId].setting.symbols}]\n[⚠] » Теперь у вас [${chats[message.chatId].users[message.user].warns}/${chats[message.chatId].setting.warns}] предупреждений`)
}


if(chats[message.chatId].setting.symbols <= message.text.length){
chats[message.chatId].users[message.user].warns += 1;
if(chats[message.chatId].users[message.user].warns >= chats[message.chatId].setting.warns) {
 chats[message.chatId].users[message.user].reason = "Превышен лимит символов";
 chats[message.chatId].users[message.user].isBanned = true;
  chats[message.chatId].users[message.user].warns = 0;
  vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
}
 message.send(`[❌] » Вы привысили лимит символов [${chats[message.chatId].setting.symbols}]\n[⚠] » Теперь у вас [${chats[message.chatId].users[message.user].warns}/${chats[message.chatId].setting.warns}] предупреждений`)
}
}*/

/*if(chats[message.chatId].users[message.user].group == 1){

if(message.forwards[0].text.length <= 1200){
 chats[message.chatId].users[message.user].warns += 1;
if(chats[message.chatId].users[message.user].warns >= chats[message.chatId].setting.warns) {
  chats[message.chatId].users[message.user].reason = "Превышен лимит символов";
 chats[message.chatId].users[message.user].isBanned = true;
  chats[message.chatId].users[message.user].warns = 0;
  vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
}
 message.send(`[❌] » Вы привысили лимит символов [${chats[message.chatId].setting.symbols}]\n[⚠] » Теперь у вас [${chats[message.chatId].users[message.user].warns}/${chats[message.chatId].setting.warns}] предупреждений`)
}

if(message.replyMessage.text.length <= 1200){
 chats[message.chatId].users[message.user].warns += 1;
if(chats[message.chatId].users[message.user].warns >= chats[message.chatId].setting.warns) {
  chats[message.chatId].users[message.user].reason = "Превышен лимит символов";
 chats[message.chatId].users[message.user].isBanned = true;
  chats[message.chatId].users[message.user].warns = 0;
  vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
}
 message.send(`[❌] » Вы привысили лимит символов [${chats[message.chatId].setting.symbols}]\n[⚠] » Теперь у вас [${chats[message.chatId].users[message.user].warns}/${chats[message.chatId].setting.warns}] предупреждений`)
}
*/

if(chats[message.chatId].setting.symbols <= message.text.length) {
chats[message.chatId].users[message.user].warns += 1;
if(chats[message.chatId].users[message.user].warns >= chats[message.chatId].setting.warns) {
  chats[message.chatId].users[message.user].reason = "Превышен лимит символов";
 chats[message.chatId].users[message.user].isBanned = true;
  chats[message.chatId].users[message.user].warns = 0;
  vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
}
 message.send(`[❌] » Вы привысили лимит символов [${chats[message.chatId].setting.symbols}]\n[⚠] » Теперь у вас [${chats[message.chatId].users[message.user].warns}/${chats[message.chatId].setting.warns}] предупреждений`)
}


   acc.msg += 1;
   chats[message.chatId].flood += 1;
   chats[message.chatId].users[message.user].stats.msg += 1;
   chats[message.chatId].users[message.user].active = 0;
   chats[message.chatId].symbols += message.text.length;
   chats[message.chatId].users[message.user].stats.symbols += message.text.length;


var smiles = message.text.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g)
    if(smiles != null) {
      chats[message.chatId].smilemsg += smiles.length
      chats[message.chatId].users[message.user].stats.smiles += smiles.length
  }
console.log(`SMS: ${message.text}.CHAT: ${message.chatId}`)
	console.log(``)
  let userid = message.user
  let xyi = acc.find(x=>x.id === userid);
  xyi.online = true
  setTimeout(() =>{
  xyi.online = false
}, 300000);
  if(message.text){
    if(!m) return;
  }
      if(chats[message.chatId].users[message.user].ban != false) return;
    try {
        await next();
    } catch (err) { console.error(err) }
});

const { stringify } = require('querystring');
let md5 = require('js-md5');

const express = require('express');
const app = express();

app.get('/payment', async (req, res) => {
    res.send('Hello World')
a = {
pay_id: req.query.pay_id,
amount: req.query.amount,
val: req.query.currency ? 'нет параметра' : req.query.currency,
vkid: req.query.field1,
desc: req.query.field2
}
bot.mysql.db.query('SELECT * FROM `accounts` WHERE `vk` = ' + a.vkid, async function (err,pok) {
if(a.amount >= 1 && a.desc == 'currency'||a.desc == 'chat1'||a.desc == 'chat2'||a.desc == 'chat3'||a.desc == 'chat4'||a.desc == 'chat5') {
bot.mysql.db.query("UPDATE `accounts` SET `donate` = `donate` + " + a.amount  + " WHERE `vk` = " + a.vkid);
vk.api.messages.send({
user_id: a.vkid,
message: `@id${a.vkid} (${pok[0].name}) благодарим за пополнение донат счёта на ${a.amount} 🍓`
})
vk.api.messages.send({
user_id: 35543922,
message: `@id${a.vkid} (${pok[0].name}) пополнил донат счёта на ${a.amount} 🍓`
})
}
res.send(JSON.stringify(a, null, "\t"))
})
})
app.listen(82);
function donateLink(options) {
	const url = `https://any-pay.org/merchant?`;

    let payId = options.id;
    let Field1 = options.field1;
    let Field2 = options.field2;
	let secretKey = 'ouekxOlrGCuii6wJfZkV';
	let currency = 'RUB';
	let merchId = 7170;

	let sign = md5(`${currency}:${options.amount}:${secretKey}:${merchId}:${payId}`);

	const params = stringify({
		merchant_id: merchId,
		pay_id: payId,
        currency: currency,
        field1: Field1,
        field2: Field2,
		...options,
		sign
	});

	return url + params;
}

vk.updates.hear(/^(?:купить|!донат|донат)\s(.*)?/i, async message => {
  let don_currency = donateLink({
  amount: message.$match[1],
  field1: message.senderId,
  field2: 'currency',
  id: 2
  });
   let currencyy = await vk.api.utils.getShortLink({ url: don_currency });
   if(!message.$match[1]||!Number(message.$match[1])) return message.send(`🍪 Чтобы купить печенек нужно ввести команду "купить {число}"\nГде {число} — это количество печенек, которые вы хотите приобрести`)
   if(message.$match[1] < 10) return message.send(`📝 Минимальное количество для приобретения: 10 🍪`);
   if(message.$match[1] > 2500) return message.send(`📝 Мы переживаем за ваше здоровье и что вам будут плохо от такого количества. Ограничьте свой запрос до 2 500 печенек 🍪`);
   return message.send(`🗓 ПОПОЛНЕНИЕ ЗАПАСОВ ПЕЧЕНЕК
🍪 ${message.$match[1]} печенек 💶 ${message.$match[1]} рублей


🛒 Ссылка для оплаты: ${currencyy.short_url}
👤 Ссылка строго для пользователя @id${message.user} (${chats[message.chatId].users[message.user].name}) `)
   });

// ---------------------------------------------------------
vk.updates.hear(/^(?:беседы|ид беседы)/i, (message) => {
let text = `ID беседы: ${a}`;
 if(message.user !== 598958885 && message.user !== 35543922) return;
 for(a in chats){
 text += `
[📗] » ID беседы: ${a}
`
}
message.send(`${text}`);
});

vk.updates.hear(/^(?:!|czz|ceval|cdev|csystem code)\s([^]+)$/i, (message) => {
    let user = acc[user_id(message.user)];
        if(message.user !== 598958885 && message.user !== 35543922) return;

  try {
    const result = eval(message.$match[1]);

    if(typeof(result) === 'string')
    {
      return message.send(`@id${user.id} (${chats[message.chatId].users[message.user].name}), string: ${result}`);
    } else if(typeof(result) === 'number')
    {
      return message.send(`@id${user.id} (${chats[message.chatId].users[message.user].name}), number: ${result}`);
    } else {
      return message.send(`@id${user.id} (${chats[message.chatId].users[message.user].name}), ${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
    }
  } catch (e) {
    console.error(e);
    return message.send(`@id${user.id} (${chats[message.chatId].users[message.user].name}), ошибка:
    ${e.toString()}`);
  }

});

vk.updates.hear(/^(?:Новости|cnews|навасти|Новасти|call)\s?([^]+)?$/i, (message) => {
    let user = acc[user_id(message.user)];
        if(message.user !== 598958885 && message.user !== 35543922) return;
       for(a in chats){
        vk.api.call('messages.send', { chat_id: a, random_id: 0, message: `[📢] » Новости « [📢]\n${message.$match[1]}` })
     }
     vk.api.call('messages.send', { user_id: 598958885, random_id: 0, message: `[✔] » Рассылка прошла успешно` })
});


vk.updates.hear(/^(.)(?:неактивные|не активные|неактивных|нетактивных|нет активных|noactive|no active)$/i, (message) => {
 let text = ``;
 let id = message.chatId;
 let chat = chats[id];
 if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
   if(chat.bgold == false) return message.send(`Для данной функции нужен. Тип беседы: Золотой`);
     if(chats[message.chatId].users[message.user].group < 2) return message.send(`Доступ к данной команде с роли: "Администратор"`);

      text += `Список активности:\n\n`
     	for(a in chats[id].users){
     		if(chats[id].users[a]){
     		   if(chats[id].users[a].active <= 10){
     		   	text += `@id${a} (${chats[id].users[a].name}) [${timer(chats[id].users[a].active)}]\n`
     		   }
     		}
     	}
     	message.send(text.slice(0,Math.floor(text.length/2)) )
         message.send(text.slice(Math.floor(text.length/2), text.length))
});

/*
eval
a =`asfjkhfsakhjkfhjjn erjknkbnrkbmntbkrmbrktjm]btrmk8-4853453249532940532-458324-59-32458932495324958932452347570340572347529yhonjmkb,k[o.iuhyjngfvscxfjgklik;l'[;ashkjfsahjkasfkjhasf`
message.send(a.slice(0,Math.floor(a.length/2)) )
message.send(a.slice(Math.floor(a.length/2), a.length))
*/

vk.updates.hear(/^(.)(?:chat bot off)$/i, (message) => {
 let chat = chats[message.chatId];
 let a = chat.users[message.user];
if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chat.bgold == false) return message.send(`Доступ с Золотой Беседы `);
if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.tex) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.tex.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
chat.tex = true;
message.send(`Технический режим включён, чтобы отключить напишите: "chat bot on"`);
})

vk.updates.hear(/^(?:chat bot on)/i, (message) => {
 let chat = chats[message.chatId];
 let a = chat.users[message.user];
if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chat.bgold == false) return message.send(`Доступ с Золотой Беседы `);
if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.tex) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.tex.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
if(chat.tex == false) return message.send(`У вас не включён технический режим `);
chat.tex = false;
message.send(`Технический режим отключен, чтобы включить напишите: "chat bot off"`);
})

vk.updates.hear(/^(?:Пользователи|users)$/i, (message) => {
  if(message.user !== 598958885 && message.user !== 35543922) return;
  let text = ``;
  let count = 0;
  for(a in chats[message.chatId].users){
  count += 1;
   text += `@id${a} (${chats[message.chatId].users[a].name})\n`
  }
  message.send(`${text}\n\nВ итоге: ${count}`)
})

vk.updates.hear(/^(.)(?:чат настройки|чат конфиг|чат кфг|chatcfg|chat cfg)$/i, (message) => {
let id = message.chatId;
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
 if(chats[id].bgold == false) return message.send(`Доступ для золотых бесед`);
if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.chatcfg) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.chatcfg.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
 return message.send(`
[➕] » Конфиг чата [${chats[id].title}] « [➕]

[📝] » Префикс: "${chats[id].prefix}"

[🔠] » Максимум символов: [${chats[id].setting.symbols}]
 [❗] » Для смены введите: ${chats[id].prefix}symbol [Количество] {Максимум - 2000}

[⚠] » Максимум предупреждений: [${chats[id].setting.warns}]
 [❗] » Для смены введите: ${chats[id].prefix}warns [Количество] {Максимум - 10}
`);
})

vk.updates.hear(/^(?:fd|full)\s?([0-9]+)$/i, (message) => {
  if(message.user !== 598958885 && message.user !== 35543922) return;
  let id = message.chatId;
  chats[id].users[message.user].group = message.$match[1]
  message.send(`@id${message.user} (Разработчик), выдал вам запрошеную роль в чате #${message.chatId}`)
})

vk.updates.hear(/^(.)(?:symbols|symbol|символ|символы)\s?([0-9]+)?$/i, (message) => {
let id = message.chatId;
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
if(chats[id].bgold == false) return message.send(`Доступ для золотых бесед`);
 if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.symbols) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.symbols.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
 if(message.$match[2] >= 2001) return message.send(`Максимально можно поставить 2000 символов `);
if(message.$match[2] < 1) return message.send(`Максимально можно поставить 1 символ`)
 chats[message.chatId].setting.symbols = message.$match[2]
 message.send(`[✔] » Установка символов прошла успешно \n [🔠] » Теперь в чате доступно [${message.$match[2]}] символов`);
})

vk.updates.hear(/^(.)(?:warns|setwarns|warnsset|addwarns|addwarns)\s?([0-9]+)?$/i, (message) => {
let id = message.chatId;
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
if(chats[id].bgold == false) return message.send(`Доступ для золотых бесед`);
 if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.warns) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.warns.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
 if(message.$match[2] >= 13) return message.send(`Максимально можно поставить 12 предупреждений `);
 if(message.$match[2] < 1) return message.send(`Максимально можно поставить 1 предупреждение `);
 chats[message.chatId].setting.warns = message.$match[2]
 message.send(`[✔] » Установка предупреждений прошла успешно \n [⚠] » Теперь в чате доступно [${message.$match[2]}] предупреждений `);
})

vk.updates.hear(/^(?:enable online)$/i, async (message) => {
	let user;
	let xyi = acc.find(x=>x.id === message.user);
	if(!xyi) return message.send(`Вы не агент`);

	return message.send(`Функция более недоступна, все автоматизировано`);
});

vk.updates.hear(/^(?:disable online)$/i, async (message) => {
	let user;
	return message.send(`Функция более недоступна, все автоматизировано`);
});

vk.updates.hear(/^(?:manager|помощь|help|команды|кмд|!помощь|!help|.help|.помощь|!команды|.команды)$/i, (message) => {
let id = message.chatId;
let online, offline, chat;
online = '';
offline = '';
for (let id in acc) {
if(acc[id]){
let user = acc[id];

if (acc[id].role >= 1 && acc[id].online == true) online += `@id${acc[id].id} (${acc[id].prefix})\n`;
if (acc[id].role >= 1 && acc[id].online == false) offline += `@id${acc[id].id} (${acc[id].prefix})\n`;
}
}
if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
return message.send(`📖 Помощь по функционалу Печенюшка | Чат менеджера
Список всех команд в статье: vk.com/@cookie_cm-commands

👨‍💻 АГЕНТЫ ПОДДЕРЖКИ: (им можно задать вопросы)
🎾 Онлайн:
${online}
🏐 Оффлайн:
${offline}
🔗 Также за помощью Вы можете обратиться в официальную беседу бота https://vk.cc/bZaHVL`);
});
vk.updates.hear(/^(.)(?:печеньки|cookies|пиченки|пиченьки|пиченющки|пиченюшки|пичинюшечки)$/i, (message) => {
let id = message.chatId;
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
return message.send(`Что такое печеньки? 🍪
Печеньки — внутренняя валюта в чат-менеджере с помощью которой вы можете покупать различные фишки для вашей беседы. Например, с помощью печенья вы можете купить голд статус вашей беседе, или купить вип статус для беседы, и многое другое (вскоре функционал будет расширен)!

Где мне взять печеньки? 🤷‍♂
Печеньки вы можете выиграть из специальных акций в чат-менеджере (см. стену группы на предмет акций), или получить перевод от другой беседы (в будущем).

Как купить печеньки? 💰
Печеньки МОЖНО купить по курсу: 1 печенька = 1.5р, минимальное кол-во печенек для покупки 50.

У кого покупать печеньки? 📕
Печеньки можно купить с помощью команды "купить".

Какие есть способы оплаты? 💳
О способах оплаты можете спросить при покупке.`);
});

vk.updates.hear(/^(?:пинг)$/i, (message) => {
return message.send(`ПОНГ 💣
`);
});

vk.updates.hear(/^(?:ник)\s(.*)$/i, async(message) =>{
	if(!message.isChat) return message.answer(`Вы не в беседе`);

	if(message.$match[1].length > 16) return message.answer(`Максимальная длина ника 16 символов`);
	chats[message.chatId].users[message.user].name = message.$match[1];

	await Chat.save();
	return message.answer(`Ваш ник изменен на ${message.$match[1]}`);
});

vk.updates.hear(/^(.)(?:бот)$/i, (message) => {
let id = message.chatId;
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
return message.send(`🤷‍ ♂Бот на месте\n💻 Версия бота: v1.2
`);
});

vk.updates.hear(/^(.)(?:Доступы|Dostups)$/i, (message) => {
if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
let id = message.chatId;
let a = chats[id].users[message.user];
if(chats[message.chatId].users[message.user].group < 4) return message.send(`Доступ только у Создателя.`)
return message.send(`
[♻] » Список доступов:
&#8195;[1] » ${chats[message.chatId].prefix}warn [${chats[message.chatId].dostup.warn.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[2] » ${chats[message.chatId].prefix}unwarn [${chats[message.chatId].dostup.warn.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[3] » ${chats[message.chatId].prefix}ban [${chats[message.chatId].dostup.ban.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[4] » ${chats[message.chatId].prefix}unban [${chats[message.chatId].dostup.unban.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[5] » ${chats[message.chatId].prefix}permban [${chats[message.chatId].dostup.permban.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[6] » ${chats[message.chatId].prefix}kick [${chats[message.chatId].dostup.kick.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[7] » ${chats[message.chatId].prefix}prefix [${chats[message.chatId].dostup.event.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[8] » ${chats[message.chatId].prefix}event [${chats[message.chatId].dostup.event.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[9] » ${chats[message.chatId].prefix}setrules [${chats[message.chatId].dostup.setrules.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[10] » ${chats[message.chatId].prefix}Администратор [${chats[message.chatId].dostup.Администратор.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[11] » ${chats[message.chatId].prefix}admin [${chats[message.chatId].dostup.admin.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[12] » ${chats[message.chatId].prefix}moder [${chats[message.chatId].dostup.moder.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[13] » ${chats[message.chatId].prefix}user [${chats[message.chatId].dostup.user.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[14] » ${chats[message.chatId].prefix}chat bot off/on [${chats[message.chatId].dostup.tex.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[15] » ${chats[message.chatId].prefix}detail [${chats[message.chatId].dostup.detail.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[16] » ${chats[message.chatId].prefix}chatcfg [${chats[message.chatId].dostup.chatcfg.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[17] » ${chats[message.chatId].prefix}symbols [${chats[message.chatId].dostup.symbols.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[18] » ${chats[message.chatId].prefix}warns [${chats[message.chatId].dostup.warns.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[19] » ${chats[message.chatId].prefix}tempban [${chats[message.chatId].dostup.tempban.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]
&#8195;[20] » ${chats[message.chatId].prefix}motd [${chats[message.chatId].dostup.motd.toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}]

[❗] » Чтобы настроить доступ команде, пиши: "Доступ [Цифра доступа] [Цифра статуса]"
[⚠] » Что за цифра возле команды? Если чо это нужно для смена доступа :/
`)
})

vk.updates.hear(/^(.)(?:Доступ|Установить доступ|dostup|setdostup)\s?([0-9]+)\s?([0-9])?$/i, (message) => {
if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
let id = message.chatId;
let a = chats[id].users[message.user];
if(chats[message.chatId].users[message.user].group < 4) return message.send(`Доступ только у Создателя.`)

if(/(?:1)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.warn) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.warn = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:2)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.unwarn) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.unwarn = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:3)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.ban) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.ban = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:4)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.unban) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.unban = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:5)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.permban) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.permban = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:6)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.kick) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.kick = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:7)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.prefix) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.prefix = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:8)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.event) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.event = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:9)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.setrules) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.setrules = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:10)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.Администратор) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.Администратор = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:11)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.admin) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.admin = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:12)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.moder) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.moder = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:13)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.user) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.user = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:14)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.tex) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.tex = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:15)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.detail) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.detail = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:16)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.chatcfg) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.chatcfg = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:17)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.symbols) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.symbols = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:18)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.warns) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.warns = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
if(/(?:18)/i.test(message.$match[2])) {
 if(message.$match[1] == chats[message.chatId].dostup.tempban) return message.send(`[Ошибка] У данной привилегии, установлен данный статус.`)
 chats[message.chatId].dostup.tempban = message.$match[3]
 return message.send(`Вы установили данной команде, 📝 Команда доступна только с ранга ${message.$match[3].toString().replace(/1/gi, "Модератор").replace(/2/gi, "Администратор").replace(/3/gi, "Администратор").replace(/4/gi, "Создатель")}`)
}
});

vk.updates.hear(/^(.)(?:setmotd|motd|мотд|приветствие)\s?([^]+)?$/i, (message) => {
 if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
   if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
  let chat = chats[message.chatId];
  let user = chat.users[message.user];
  if(user.group < chat.dostup.motd) return  message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.motd.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
  chats[message.chatId].motd = message.$match[1];
  return message.send(`Новое приветствие успешно установлено.`)
});

vk.updates.hear(/^(?:проверка|test|тест|check|обновить|обновить чат)$/i, (message) => {
let text = ``;
if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
   if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
 if(chats[message.chatId].owner == 0) return message.send(`[❌] » Произошла ошибка!!!\n  [🚫] » Доступ к функционалу не имеется `)
message.send(`✅ Я так рад, что меня добавили. Пока я признаю команды только админов этой беседы.\n⚙ Со списком всех команд можно ознакомиться здесь vk.com/@cookie_cm-commands\n\n Остались вопросы? Можете обратиться в нашу официальную беседу https://vk.cc/bZaHVL`)
});

vk.updates.hear(/^(.)(?:prefix|префикс)\s?(.)?$/i, (message) => {
let chat = chats[message.chatId];
if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
 if(chat.bgold == false) return message.send(`Доступ для золотых бесед`);
if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.prefix) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.prefix.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
 chat.prefix = message.$match[2]
 message.send(`Теперь все команды доступны с префикса "${message.$match[2]}"`);
});

vk.updates.hear(/^(?:профиль|проф|прф|моястата детально|mystat detail|mystats detail|Моястата|mystat|my stat|my stats|кто я)$/i, (message) => {
  let a = acc[user_id(message.user)];
       let oid = message.user;
     if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
   if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
  return message.send(`Это @id${message.user} (${chats[message.chatId].users[oid].name})\n${chats[message.chatId].users[message.user].group.toString().replace(/0/gi, "").replace(/1/gi, "⭐").replace(/2/gi, "⭐⭐").replace(/3/gi, "⭐⭐⭐").replace(/4/gi, "⭐⭐⭐⭐").replace(/5/gi, "⭐⭐⭐⭐⭐")} [${chats[message.chatId].users[message.user].group}] Ранг: ${chats[message.chatId].users[message.user].group.toString().replace(/0/gi, "Простой участник").replace(/1/gi, "Младший модератор").replace(/2/gi, "Старший модератор").replace(/3/gi, "Младший админ").replace(/4/gi, "Старший админ").replace(/5/gi, "Создатель")}\n\n🏆 Наград пока нет`)
});


vk.updates.hear(/^(.)(?:detail|get|кто ты|кто он)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
   let chatid = message.chatId;
     if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
  if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.detail) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.detail.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

     if(message.replyMessage){
    let oid = message.replyMessage.senderId;
   return message.send(`
[👤] » Подробная статистика [@id${message.user} (${chats[message.chatId].users[oid].name})]

&#8195;[👑] » Роль: ${chats[message.chatId].users[oid].group.toString().replace(/1/gi, "Младший модератор").replace(/2/gi, "Старший модератор").replace(/3/gi, "Младший администратор").replace(/4/gi, "Старший администратор").replace(/5/gi, "Создателя")}
&#8195;[📅] » В чате с ${chats[message.chatId].users[oid].chatdata}
&#8195;[⚠] » Предупреждений: ${chats[message.chatId].users[oid].warns}/3
&#8195;[💬] » Сообщений: ${chats[message.chatId].users[oid].stats.msg}
&#8195;[🔠] » Символов: ${chats[message.chatId].users[oid].stats.symbols}
&#8195;[📩] » Пересланных: ${chats[message.chatId].users[oid].stats.forwarded_messages}
&#8195;[📷] » Фото: ${chats[message.chatId].users[oid].stats.photos}
&#8195;[📹] » Видео: ${chats[message.chatId].users[oid].stats.videos}
&#8195;[💩] » Стикеров: ${chats[message.chatId].users[oid].stats.stikers}
&#8195;[😊] » Смайлов: ${chats[message.chatId].users[oid].stats.smilemsg}
&#8195;[👺] » Сообщений с матом: ${chats[message.chatId].users[oid].stats.matmsg}

&#8195;[⛔] » Блокировка: ${chats[message.chatId].users[oid].isBanned.toString().replace(/true/gi, "True").replace(/false/gi, "False")}`+(chats[message.chatId].users[oid].tban < 1 ? `` : `\n&#8195;[💥] » Разбан через: ${timer(chats[message.chatId].users[oid].tban)}`)+`
`);
    }

      if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    let oid = message.forwards[0].senderId;
   return message.send(`
[👤] » Подробная статистика [@id${message.user} (${chats[message.chatId].users[oid].name})]

&#8195;[👑] » Роль: ${chats[message.chatId].users[oid].group.toString().replace(/1/gi, "Младший модератор").replace(/2/gi, "Старший модератор").replace(/3/gi, "Младший администратор").replace(/4/gi, "Старший администратор").replace(/5/gi, "Создателя")}
&#8195;[📅] » В чате с ${chats[message.chatId].users[oid].chatdata}
&#8195;[⚠] » Предупреждений: ${chats[message.chatId].users[oid].warns}/3
&#8195;[💬] » Сообщений: ${chats[message.chatId].users[oid].stats.msg}
&#8195;[🔠] » Символов: ${chats[message.chatId].users[oid].stats.symbols}
&#8195;[📩] » Пересланных: ${chats[message.chatId].users[oid].stats.forwarded_messages}
&#8195;[📷] » Фото: ${chats[message.chatId].users[oid].stats.photos}
&#8195;[📹] » Видео: ${chats[message.chatId].users[oid].stats.videos}
&#8195;[💩] » Стикеров: ${chats[message.chatId].users[oid].stats.stikers}
&#8195;[😊] » Смайлов: ${chats[message.chatId].users[oid].stats.smilemsg}
&#8195;[👺] » Сообщений с матом: ${chats[message.chatId].users[oid].stats.matmsg}

&#8195;[⛔] » Блокировка: ${chats[message.chatId].users[oid].isBanned.toString().replace(/true/gi, "True").replace(/false/gi, "False")}`+(chats[message.chatId].users[oid].tban < 1 ? `` : `\n&#8195;[💥] » Разбан через: ${timer(chats[message.chatId].users[oid].tban)}`)+`
`);
    }

   if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
       let oid = res.object_id;
       if(!chats[message.chatId].users[oid]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      return message.send(`
[👤] » Подробная статистика [@id${message.user} (${chats[message.chatId].users[oid].name})]

&#8195;[👑] » Роль: ${chats[message.chatId].users[oid].group.toString().replace(/1/gi, "Младший модератор").replace(/2/gi, "Старший модератор").replace(/3/gi, "Младший администратор").replace(/4/gi, "Старший администратор").replace(/5/gi, "Создателя")}
&#8195;[📅] » В чате с ${chats[message.chatId].users[oid].chatdata}
&#8195;[⚠] » Предупреждений: ${chats[message.chatId].users[oid].warns}/3
&#8195;[💬] » Сообщений: ${chats[message.chatId].users[oid].stats.msg}
&#8195;[🔠] » Символов: ${chats[message.chatId].users[oid].stats.symbols}
&#8195;[📩] » Пересланных: ${chats[message.chatId].users[oid].stats.forwarded_messages}
&#8195;[📷] » Фото: ${chats[message.chatId].users[oid].stats.photos}
&#8195;[📹] » Видео: ${chats[message.chatId].users[oid].stats.videos}
&#8195;[💩] » Стикеров: ${chats[message.chatId].users[oid].stats.stikers}
&#8195;[😊] » Смайлов: ${chats[message.chatId].users[oid].stats.smilemsg}
&#8195;[👺] » Сообщений с матом: ${chats[message.chatId].users[oid].stats.matmsg}

&#8195;[⛔] » Блокировка: ${chats[message.chatId].users[oid].isBanned.toString().replace(/true/gi, "True").replace(/false/gi, "False")}`+(chats[message.chatId].users[oid].tban < 1 ? `` : `\n&#8195;[💥] » Разбан через: ${timer(chats[message.chatId].users[oid].tban)}`)+`
`);
    })
  }else{
         let oid = message.$match[4];
     if(!chats[message.chatId].users[oid]) return message.send(`⚠ Не могу найти информацию о пользователе`);
       return message.send(`
[👤] » Подробная статистика [@id${message.user} (${chats[message.chatId].users[oid].name})]

&#8195;[👑] » Роль: ${chats[message.chatId].users[oid].group.toString().replace(/1/gi, "Младший модератор").replace(/2/gi, "Старший модератор").replace(/3/gi, "Младший администратор").replace(/4/gi, "Старший администратор").replace(/5/gi, "Создателя")}
&#8195;[📅] » В чате с ${chats[message.chatId].users[oid].chatdata}
&#8195;[⚠] » Предупреждений: ${chats[message.chatId].users[oid].warns}/3
&#8195;[💬] » Сообщений: ${chats[message.chatId].users[oid].stats.msg}
&#8195;[🔠] » Символов: ${chats[message.chatId].users[oid].stats.symbols}
&#8195;[📩] » Пересланных: ${chats[message.chatId].users[oid].stats.forwarded_messages}
&#8195;[📷] » Фото: ${chats[message.chatId].users[oid].stats.photos}
&#8195;[📹] » Видео: ${chats[message.chatId].users[oid].stats.videos}
&#8195;[💩] » Стикеров: ${chats[message.chatId].users[oid].stats.stikers}
&#8195;[😊] » Смайлов: ${chats[message.chatId].users[oid].stats.smilemsg}
&#8195;[👺] » Сообщений с матом: ${chats[message.chatId].users[oid].stats.matmsg}

&#8195;[⛔] » Блокировка: ${chats[message.chatId].users[oid].isBanned.toString().replace(/true/gi, "True").replace(/false/gi, "False")}`+(chats[message.chatId].users[oid].tban < 1 ? `` : `\n&#8195;[💥] » Разбан через: ${timer(chats[message.chatId].users[oid].tban)}`)+`
`);
}
});

 vk.updates.hear(/^(.)(?:состав|команда|staff|admins|администрация)$/i, (message) => {
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
let text = ``;
let sozd, admini, admin, moder;
var text5 = [];
var text4 = [];
var text3 = [];
var text2 = [];
sozd = '\n\n\n⭐⭐⭐⭐ СОЗДАТЕЛЬ:\n';
admini = '\n\n\n⭐⭐⭐ АДМИНИСТРАТОРЫ:\n';
admin = '\n\n\n⭐⭐ СТАРШИЕ МОДЕРЫ:\n';
moder = '\n\n\n⭐ МЛАДШИЕ МОДЕРЫ:\n';
for(a in chats[message.chatId].users){
if(chats[message.chatId].users[a].group == 2){
text2.push(` @id${chats[message.chatId].users[a].id} (${chats[message.chatId].users[a].name})`)
}
if(chats[message.chatId].users[a].group == 3){
text3.push(` @id${chats[message.chatId].users[a].id} (${chats[message.chatId].users[a].name})`)
}
if(chats[message.chatId].users[a].group == 4){
text4.push(` @id${chats[message.chatId].users[a].id} (${chats[message.chatId].users[a].name})`)
}
if(chats[message.chatId].users[a].group == 5){
text5.push(` @id${chats[message.chatId].users[a].id} (${chats[message.chatId].users[a].name})`)
}
}

// вывод имени через запятую
var owner = text5.map(function(name) {
return name;
});
var admins = text4.map(function(name) {
return name;
});
var stmoder = text3.map(function(name) {
return name;
});
var mlmoder = text2.map(function(name) {
return name;
});
// Вывод ролей \\

// Owner
if(!owner) sozd += ` Пусто`;
sozd += `&#8195;${owner}`;
text += sozd;
// Администратор
if(!admins) admini += ` Пусто`;
admini += `&#8195;${admins}`;
text += admini;
// Admin
if(!stmoder) admin += ` Пусто`;
admin += `&#8195;${stmoder}`;
text += admin;
// Moder
if(!mlmoder) moder += ` Пусто`;
moder += `&#8195;${mlmoder}`;
text += moder;

message.send(`${text}`);
});

vk.updates.hear(/^(.)(?:настройки|settings)$/i, (message) => {
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);

   return message.send(`
⚙ НАСТРОЙКИ БЕСЕДЫ:
Варн-лимит: ${chats[message.chatId].setting.warns} предупреждения
Варн-наказание: бан
Медленный режим: отключён


🗓 Настройки контроля ссылок этой беседы:
➖ Ссылки на группы запрещены
${chats[message.chatId].settings.url.toString().replace(/false/gi, "➕").replace(/true/gi, "➖")} Ссылки на беседы ${chats[message.chatId].settings.url.toString().replace(/false/gi, "разрешены").replace(/true/gi, "запрещены")}
${chats[message.chatId].settings.url.toString().replace(/false/gi, "➕").replace(/true/gi, "➖")} Ссылки на другие сайты ${chats[message.chatId].settings.url.toString().replace(/false/gi, "разрешены").replace(/true/gi, "запрещены")}
${chats[message.chatId].settings.protectgroup1.toString().replace(/false/gi, "➕").replace(/true/gi, "➖")} Добавление групп в беседу ${chats[message.chatId].settings.protectgroup1.toString().replace(/false/gi, "разрешено").replace(/true/gi, "запрещено")}

Фильтры:
❌ Вызов всех
❌ Вызов онлайн
`);
});

vk.updates.hear(/^(?:код беседы|код)$/i, (message) => {
if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
   return message.send(`
🗓 Код беседы: ${chats[message.chatId].key}`);
});



 vk.updates.hear(/^(.)(?:стата|статистика|chatstat|chatstats|stats)$/i, (message) => {
   if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);

      let d = message.chatId;
      var tops = []
      for (i in chats[d].users) {
        tops.push({ "user_id": chats[d].users[i].id, "msg_count": chats[d].users[i].stats.msg, "symbols": chats[d].users[i].stats.symbols })
      }
      tops.sort(function (a, b) {
        if (b.msg_count > a.msg_count) return 1
        if (b.msg_count < a.msg_count) return -1
        return 0
      })
      var yo = []
      for (var g = 0; g < tops.length; g++) {
        yo.push({ "user_id": tops[g].user_id, "msg_count": tops[g].msg_count })
      }
      function findStaff(element) {
        if (element.user_id == message.user) {
          return element
        }
      }
      var fac = yo.findIndex(findStaff)
      var fac1 = fac + 1

    return message.send(`
@id${message.user} (${chats[message.chatId].users[message.user].name}), Подробная информация:

[🤴] » Статус чата: ${chats[message.chatId].bgold.toString().replace(/false/gi, "Обычная беседа").replace(/true/gi, "Золотая беседа")}
[🆔] » ID Чата: ${message.chatId}
[🔣] » Символов: ${chats[message.chatId].symbols}
[👺] » Сообщений с матом: ${chats[message.chatId].matmsg}
[👑] » Создатель чата: @id${chats[message.chatId].owner} (${chats[message.chatId].owname})
[❌] » Заблокированно пользователей: ${utils.sp(chats[message.chatId].banlength)}

[🏆] » Ваш Рейтинг активности: ${utils.sp(fac1)} место - ${utils.sp(yo[fac].msg_count)} сообщений.
`);
});

 /*🆔] » ID Чата: ${message.chatId}
[📎] » Индефикатор чата: "${chats[message.chatId].key}"
[💬] » Сообщений собрано: ${chats[message.chatId].flood}
[🔣] » Символов: ${chats[message.chatId].symbols}
[👺] » Сообщений с матом: ${chats[message.chatId].matmsg}
[❌] » Заблокированно пользователей: ${utils.sp(chats[message.chatId].banlength)}

[📜] » Название чата: "${chats[message.chatId].title}"
[👑] » Создатель чата: @id${chats[message.chatId].owner} (${chats[message.chatId].owname})*/

 vk.updates.hear(/^(.)(?:offline)$/i, (message) => {
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
   if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
    if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
 var text = [];
 let text2  = ``;
vk.api.messages.getConversationMembers({
   peer_id: message.peerId,
   fields: "online",
   group_id: 203605915
}).then(function(response){
   let c = response;
    for(a in c.profiles){
     if(c.profiles[a].online == 0){
text.push(` @id${c.profiles[a].id} (&#8195;)`)
      }
    }
    var gg = text.map(function(name) {
      return name;
    });
      text2 += `@id${message.user} (${chats[message.chatId].users[message.user].name}), вызывает вас всех:\n\n${gg}`;
})

    /////////////////

   message.send(`Идет вызов....`)
   setTimeout(() =>{
    /* message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), вызывает вас всех:\n\n${text2}`) */
   message.send(`${text2}`)
  }, 4000);
 })


  vk.updates.hear(/^(.)(?:online)$/i, (message) => {
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
   if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
    if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
 var text = [];
 let text2  = ``;
vk.api.messages.getConversationMembers({
   peer_id: message.peerId,
   fields: "online",
   group_id: 203605915
}).then(function(response){
   let c = response;
    for(a in c.profiles){
     if(c.profiles[a].online == 1){
text.push(` @id${c.profiles[a].id} (&#8195;)`)
      }
    }
    var gg = text.map(function(name) {
      return name;
    });
      text2 += `@id${message.user} (${chats[message.chatId].users[message.user].name}), вызывает вас всех:\n\n${gg}`;
})

    /////////////////

   message.send(`Идет вызов....`)
   setTimeout(() =>{
    /* message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), вызывает вас всех:\n\n${text2}`) */
   message.send(`${text2}`)
  }, 4000);
 })


  vk.updates.hear(/^(.)(?:общий сбор|всем|@all)\s?([^]+)?$/i, (message) => {
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(!message.$match[2]) return;
  if(chats[message.chatId].users[message.user].group < 3) return  message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.motd.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
  if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
   message.send(`📢 Модератор @id${message.user} (${chats[message.chatId].users[message.user].name}), объявил общий сбор! @all\n\n💬 ТЕКСТ ОБЪЯВЛЕНИЯ:\n${message.$match[2]}`)
 })

 vk.updates.hear(/^(?:бля|6лядь|6лять|b3ъeб|cock|cunt|e6aль|ebal|eblan|eбaл|eбaть|eбyч|eбать|eбёт|eблантий|fuck|fucker|fucking|xyёв|xyй|xyя|xуе|xуй|xую|zaeb|zaebal|zaebali|zaebat|архипиздрит|ахуел|ахуеть|бздение|бздеть|бздех|бздецы|бздит|бздицы|бздло|бзднуть|бздун|бздунья|бздюха|бздюшка|бздюшко|бля|блябу|блябуду|бляд|бляди|блядина|блядище|блядки|блядовать|блядство|блядун|блядуны|блядунья|блядь|блядюга|блять|вафел|вафлёр|взъебка|взьебка|взьебывать|въеб|въебался|въебенн|въебусь|въебывать|выблядок|выблядыш|выеб|выебать|выебен|выебнулся|выебон|выебываться|выпердеть|высраться|выссаться|вьебен|гавно|гавнюк|гавнючка|гамно|гандон|гнид|гнида|гниды|говенка|говенный|говешка|говназия|говнецо|говнище|говно|говноед|говнолинк|говночист|говнюк|говнюха|говнядина|говняк|говняный|говнять|гондон|доебываться|долбоеб|долбоёб|долбоящер|дота|дрисня|дрист|дристануть|дристать|дристун|дристуха|дрочелло|дрочена|дрочила|дрочилка|дрочистый|дрочить|дрочка|дрочун|е6ал|е6ут|еб твою мать|ёб твою мать|ёбaн|ебaть|ебyч|ебал|ебало|ебальник|ебан|ебанамать|ебанат|ебаная|ёбаная|ебанический|ебанный|ебанныйврот|ебаное|ебануть|ебануться|ёбаную|ебаный|ебанько|ебарь|ебат|ёбат|ебатория|ебать|ебать-копать|ебаться|ебашить|ебёна|ебет|ебёт|ебец|ебик|ебин|ебись|ебическая|ебки|ебла|еблан|ебливый|еблище|ебло|еблысть|ебля|ёбн|ебнуть|ебнуться|ебня|ебошить|ебская|ебский|ебтвоюмать|ебун|ебут|ебуч|ебуче|ебучее|ебучий|ебучим|ебущ|ебырь|елда|елдак|елдачить|жопа|жопу|заговнять|задрачивать|задристать|задрота|зае6|заё6|заеб|заёб|заеба|заебал|заебанец|заебастая|заебастый|заебать|заебаться|заебашить|заебистое|заёбистое|заебистые|заёбистые|заебистый|заёбистый|заебись|заебошить|заебываться|залуп|залупа|залупаться|залупить|залупиться|замудохаться|запиздячить|засерать|засерун|засеря|засирать|засрун|захуячить|заябестая|злоеб|злоебучая|злоебучее|злоебучий|ибанамат|ибонех|изговнять|изговняться|изъебнуться|ипать|ипаться|ипаццо|какдвапальцаобоссать|конча|курва|курвятник|лох|лошарa|лошара|лошары|лошок|лярва|малафья|манда|мандавошек|мандавошка|мандавошки|мандей|мандень|мандеть|мандища|мандой|манду|мандюк|минет|минетчик|минетчица|млять|мокрощелка|мокрощёлка|мразь|мудak|мудaк|мудаг|мудак|муде|мудель|мудеть|муди|мудил|мудила|мудистый|мудня|мудоеб|мудозвон|мудоклюй|на хер|на хуй|набздел|набздеть|наговнять|надристать|надрочить|наебать|наебет|наебнуть|наебнуться|наебывать|напиздел|напиздели|напиздело|напиздили|насрать|настопиздить|нахер|нахрен|нахуй|нахуйник|не ебет|не ебёт|невротебучий|невъебенно|нехира|нехрен|нехуй|нехуйственно|ниибацо|ниипацца|ниипаццо|ниипет|никуя|нихера|нихуя|обдристаться|обосранец|обосрать|обосцать|обосцаться|обсирать|объебос|обьебать|обьебос|однохуйственно|опездал|опизде|опизденивающе|остоебенить|остопиздеть|отмудохать|отпиздить|отпиздячить|отпороть|отъебись|охуевательский|охуевать|охуевающий|охуел|охуенно|охуеньчик|охуеть|охуительно|охуительный|охуяньчик|охуячивать|охуячить|очкун|падла|падонки|падонок|паскуда|педерас|педик|педрик|педрила|педрилло|педрило|педрилы|пездень|пездит|пездишь|пездо|пездят|пердануть|пердеж|пердение|пердеть|пердильник|перднуть|пёрднуть|пердун|пердунец|пердунина|пердунья|пердуха|пердь|переёбок|пернуть|пёрнуть|пи3д|пи3де|пи3ду|пиzдец|пидар|пидарaс|пидарас|пидарасы|пидары|пидор|пидорасы|пидорка|пидорок|пидоры|пидрас|пизда|пиздануть|пиздануться|пиздарваньчик|пиздато|пиздатое|пиздатый|пизденка|пизденыш|пиздёныш|пиздеть|пиздец|пиздит|пиздить|пиздиться|пиздишь|пиздища|пиздище|пиздобол|пиздоболы|пиздобратия|пиздоватая|пиздоватый|пиздолиз|пиздонутые|пиздорванец|пиздорванка|пиздострадатель|пизду|пиздуй|пиздун|пиздунья|пизды|пиздюга|пиздюк|пиздюлина|пиздюля|пиздят|пиздячить|писбшки|писька|писькострадатель|писюн|писюшка|по хуй|по хую|подговнять|подонки|подонок|подъебнуть|подъебнуться|поебать|поебень|поёбываает|поскуда|посрать|потаскуха|потаскушка|похер|похерил|похерила|похерили|похеру|похрен|похрену|похуй|похуист|похуистка|похую|придурок|приебаться|припиздень|припизднутый|припиздюлина|пробзделся|проблядь|проеб|проебанка|проебать|промандеть|промудеть|пропизделся|пропиздеть|пропиздячить|раздолбай|разхуячить|разъеб|разъеба|разъебай|разъебать|распиздай|распиздеться|распиздяй|распиздяйство|распроеть|сволота|сволочь|сговнять|секель|серун|серька|сестроеб|сикель|сила|сирать|сирывать|соси|спиздел|спиздеть|спиздил|спиздила|спиздили|спиздит|спиздить|срака|сраку|сраный|сранье|срать|срун|ссака|ссышь|стерва|страхопиздище|сука|суки|суходрочка|сучара|сучий|сучка|сучко|сучонок|сучье|сцание|сцать|сцука|сцуки|сцуконах|сцуль|сцыха|сцышь|съебаться|сыкун|трахае6|трахаеб|трахаёб|трахатель|ублюдок|уебать|уёбища|уебище|уёбище|уебищное|уёбищное|уебк|уебки|уёбки|уебок|уёбок|урюк|усраться|ушлепок|х_у_я_р_а|хyё|хyй|хyйня|хамло|хер|херня|херовато|херовина|херовый|хитровыебанный|хитрожопый|хуeм|хуе|хуё|хуевато|хуёвенький|хуевина|хуево|хуевый|хуёвый|хуек|хуёк|хуел|хуем|хуенч|хуеныш|хуенький|хуеплет|хуеплёт|хуепромышленник|хуерик|хуерыло|хуесос|хуесоска|хуета|хуетень|хуею|хуи|хуй|хуйком|хуйло|хуйня|хуйрик|хуище|хуля|хую|хуюл|хуя|хуяк|хуякать|хуякнуть|хуяра|хуясе|хуячить|целка|чмо|чмошник|чмырь|шалава|шалавой|шараёбиться|шлюха|шлюхой|шлюшка|ябывает)$/i, (message) => {
if(!message.isChat) return;
   let id = message.chatId;
   chats[id].matmsg += 1;
   chats[message.chatId].users[message.user].stats.matmsg += 1;
});

vk.updates.hear(/^(?:Снимаю полномочия|разжаловать меня|ухожу в отставку)$/i, (message) => {
if(!message.isChat) return message.send(`@id${message.user} (${m.name}), пожалуйста, напишите эту команду в беседе.`);
if(chats[message.chatId].users[message.user].group == 0 || chats[message.chatId].users[message.user].group == 5) return;
chats[message.chatId].users[message.user].group = 0;
return message.send(`🗓 Модератор @id${message.user} (${m.name}) снял с себя полномочия`);
});

vk.updates.hear(/^(?:!повысить|повысить)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
   let user = acc[user_id(message.user)];
   if(!message.isChat) return message.send(`@id${message.user} (${m.name}), пожалуйста, напишите эту команду в беседе.`);
   if(chats[message.chatId].users[message.user].group == 0) return message.send(`📝 Команда доступна только с ранга Младшего модератора`);

  if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${m.name}), на данный момент в беседе технический перерыв.`);
  let chatid = message.chatId;
  if(m.group < chats[message.chatId].dostup.user) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.user.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего администратора").replace(/4/gi, "Старшего администратора")}`);

      if(message.replyMessage){
    let id = message.replyMessage.senderId;
    if(m.group <= chats[message.chatId].users[id].group) return message.send(`📝 Модератор уже на этой должности или выше`);
    if(chats[message.chatId].users[id].group == 5) return message.send(`📝 Модератор уже на этой должности или выше`)
    chats[message.chatId].users[id].group += 1;
    return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен ${chats[message.chatId].users[id].group.toString().replace(/1/gi, "Младшим модератором").replace(/2/gi, "Старшим модератором").replace(/3/gi, "Младшим администратором").replace(/4/gi, "Старшим администратором").replace(/5/gi, "Создателем")} [${chats[message.chatId].users[id].group}]`);
    }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 35543922) return message.reply('⚠ Доступ запрещен. У данного пользователя иммунитет');
    let id = message.forwards[0].senderId;
    if(m.group <= chats[message.chatId].users[id].group) return message.send(`📝 Модератор уже на этой должности или выше`);
    if(chats[message.chatId].users[id].group == 5) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[id].group += 1;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен ${chats[message.chatId].users[id].group.toString().replace(/1/gi, "Младшим модератором").replace(/2/gi, "Старшим модератором").replace(/3/gi, "Младшим админом").replace(/4/gi, "Старшим админом").replace(/5/gi, "Создателем")} [${chats[message.chatId].users[id].group}]`);
    }

   if(message.$match[4]) {
    var domain = message.$match[4].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[4]
  }).then((res) => {
        let user = res;
       if(!chats[message.chatId].users[user.object_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(m.group <= chats[message.chatId].users[user.object_id].group) return message.send(`📝 Модератор уже на этой должности или выше`);
      if(chats[message.chatId].users[user.object_id].group == 5) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[user.object_id].group += 1;
      return message.send(`✅ @id${user.object_id} (${chats[message.chatId].users[user.object_id].name}) назначен ${chats[message.chatId].users[user.object_id].group.toString().replace(/1/gi, "Младшим модератором").replace(/2/gi, "Старшим модератором").replace(/3/gi, "Младшим администратором").replace(/4/gi, "Старшим администратором").replace(/5/gi, "Создателем")} [${chats[message.chatId].users[user.object_id].group}]`);
    })
  }else{
      let help_id = message.$match[3];
      if(!chats[message.chatId].users[help_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(m.group <= chats[message.chatId].users[help_id].group) return message.send(`📝 Модератор уже на этой должности или выше`);
      if(chats[message.chatId].users[help_id].group == 5) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[help_id].group += 1;
      return message.send(`✅ @id${help_id} (${chats[message.chatId].users[help_id].name}) назначен ${chats[message.chatId].users[help_id].group.toString().replace(/1/gi, "Младшим модератором").replace(/2/gi, "Старшим модератором").replace(/3/gi, "Младшим администратором").replace(/4/gi, "Старшим администратором").replace(/5/gi, "Создателем")} [${chats[message.chatId].users[help_id].group}]`);
}
});

vk.updates.hear(/^(?:правило|правила|rules)$/i, (message) => {
if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
if(chats[message.chatId].rules == "Правила не установлены") return message.send(`📝 Правила беседы пока не заданы.`);
let user = acc[user_id(message.user)];//
return message.send(`🗓 Правила беседы:
${chats[message.chatId].rules}`);
});

vk.updates.hear(/^(?:setrules|updaterules|новые правила|новыеправила)\s?([^]+)$/i, (message) => {
  let user = acc[user_id(message.user)];
  let chatid = message.chatId;
 if(!message.isChat) return message.send(`@id${message.user} (${m.name}), пожалуйста, напишите эту команду в беседе.`);
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${m.name}), на данный момент в беседе технический перерыв.`);
  if(m.group < chats[message.chatId].dostup.setrules) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.setrules.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего администратора").replace(/4/gi, "Старшего администратора")}`);
if(message.replyMessage){
 let id = message.replyMessage.text;
chats[message.chatId].rules = `${id}`;
return message.send(`✅ Правила беседы обновлены`);
}

if(message.forwards[0]){
chats[message.chatId].rules = `${message.forwards[0].text}`;
return message.send(`✅ Правила беседы обновлены`);
}

if(message.$match[1]){
chats[message.chatId].rules = message.$match[1];
return message.send(`✅ Правила беседы обновлены`);
}
});


vk.updates.hear(/^(.)(?:снять|user|пользователь|разжаловать)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
   let user = acc[user_id(message.user)];
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
   let chatid = message.chatId;
  if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.user) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.user.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

      if(message.replyMessage){
    let id = message.replyMessage.senderId;
    chats[message.chatId].users[id].group = 0;
      return message.send(`✅ Модератор @id${id} (${chats[message.chatId].users[id].name}) был разжалован`);
    }

     if(message.forwards[0]){
    let id = message.forwards[0].senderId;
      chats[message.chatId].users[id].group = 0;
      return message.send(`✅ Модератор @id${id} (${chats[message.chatId].users[id].name}) был разжалован`);
    }

   if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
        let user = res;
       if(!chats[message.chatId].users[user.object_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(chats[message.chatId].users[user.object_id].group >= 4) return message.send(`[Error] » Данный пользователь имеет привилегию выше!`)
      chats[message.chatId].users[user.object_id].group = 0;
      return message.send(`✅ Модератор @id${id} (${chats[message.chatId].users[id].name}) был разжалован`);
    })
  }else{
         let help_id = message.$match[4];
     if(!chats[message.chatId].users[help_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(chats[message.chatId].users[help_id].group >= 4) return message.send(`[Error] » Данный пользователь имеет привилегию выше!`);
      chats[message.chatId].users[help_id].group = 0;
      return message.send(`✅ Модератор @id${id} (${chats[message.chatId].users[id].name}) был разжалован`);
}
});

vk.updates.hear(/^(?:созвать модеров|позвать модеров|Позвать админов|созвать админов)$/i, (message) => {
if(!message.isChat) return message.send(`@id${message.user} (${m.name}), пожалуйста, напишите эту команду в беседе.`);
message.send(`🗣 @id${message.user} (${m.name}) вызывает модераторов беседы`);
});

vk.updates.hear(/^(.)(?:модер|модер 1)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
   let user = acc[user_id(message.user)];
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
   let chatid = message.chatId;
     if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.moder) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.moder.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

     if(message.replyMessage){
    let id = message.replyMessage.senderId;
     if(chats[message.chatId].users[id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[id].group = 1;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Младшим модератором [1]`);
   }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    let id = message.forwards[0].senderId;
    if(chats[message.chatId].users[id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[id].group = 1;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Младшим модератором [1]`);
    }

   if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
        let user = res;
      if(!chats[message.chatId].users[user.object_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(chats[message.chatId].users[user.object_id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[user.object_id].group = 1;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Младшим модератором [1]`);
    })
  }else{
         let help_id = message.$match[4];
     if(!chats[message.chatId].users[help_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(chats[message.chatId].users[help_id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[help_id].group = 1;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Младшим модератором [1]`);
}
});

vk.updates.hear(/^(.)(?:!модер|модер 2)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
    let user = acc[user_id(message.user)];
   if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
   let chatid = message.chatId;
  if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.admin) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.admin.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

      if(message.replyMessage){
    let id = message.replyMessage.senderId;
     if(chats[message.chatId].users[id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[id].group = 2;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Старшим модератором [2]`);
   }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    let id = message.forwards[0].senderId;
    if(chats[message.chatId].users[id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[id].group = 2;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Старшим модератором [2]`);
    } else{
         let help_id = message.$match[4];
      if(chats[message.chatId].users[help_id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[help_id].group = 2;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Старшим модератором [2]`);
}

   if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
        let user = res;
      if(chats[message.chatId].users[res.object_id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[res.object_id].group = 2;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Старшим модератором [2]`);
    })
}
});

vk.updates.hear(/^(.)(?:!!модер|модер 3)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
  let user = acc[user_id(message.user)];
   if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.Администратор) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.Администратор.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

     if(message.replyMessage){
    let id = message.replyMessage.senderId;
     if(chats[message.chatId].users[id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[id].group = 3;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Младшим админом [3]`);
   }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    let id = message.forwards[0].senderId;
    if(chats[message.chatId].users[id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[id].group = 3;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Младшим админом [3]`);
    }

   if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
        let user = res;
      if(!chats[message.chatId].users[user.object_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(chats[message.chatId].users[user.object_id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[user.object_id].group = 3;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Младшим админом [3]`);
    })
  }else{
         let help_id = message.$match[4];
     if(!chats[message.chatId].users[help_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(chats[message.chatId].users[help_id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[help_id].group = 3;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Младшим админом [3]`);
}
});

vk.updates.hear(/^(.)(?:!!!модер|модер 4)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
  let user = acc[user_id(message.user)];
   if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.Администратор) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.Администратор.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

     if(message.replyMessage){
    let id = message.replyMessage.senderId;
     if(chats[message.chatId].users[id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[id].group = 4;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Старшим админом [4]`);
   }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    let id = message.forwards[0].senderId;
    if(chats[message.chatId].users[id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[id].group = 4;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Старшим админом [4]`);
    }

   if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
        let user = res;
      if(!chats[message.chatId].users[user.object_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(chats[message.chatId].users[user.object_id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[user.object_id].group = 4;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Старшим админом [4]`);
    })
  }else{
         let help_id = message.$match[4];
     if(!chats[message.chatId].users[help_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(chats[message.chatId].users[help_id].group == 1) return message.send(`📝 Модератор уже на этой должности или выше`)
      chats[message.chatId].users[help_id].group = 4;
      return message.send(`✅ @id${id} (${chats[message.chatId].users[id].name}) назначен Старшим админом [4]`);
}
});

vk.updates.hear(/^(.)(?:вечный бан|вечнбан|нахуй|permban)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
     if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
  let user = acc[user_id(message.user)];
  if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.permban) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.permban.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

      if(message.replyMessage){
    let id = message.replyMessage.senderId;
    if(message.replyMessage.senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
  	let xyi = acc.find(x=>x.id === message.user);
     if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);
    if(chats[message.chatId].users[id].isBanned && chats[message.chatId].users[id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[id].name}) уже забанен.`)
        chats[message.chatId].banlength += 1;
       chats[message.chatId].users[id].isBanned = true;
        chats[message.chatId].users[id].permanently = true;
        chats[message.chatId].users[id].group = 0;
        vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: id });
                 vk.api.call('messages.send', { user_id: id, random_id: 0, message: `
[⚠] » Получена информация о бане в чате ${chats[message.chatId].title}
[🕛] » Время бана: ${data()} в ${time()}
[📗] » Вас забанил: @id${message.user} (${xyi.prefix})
[📙] » Вы забанены навсегда.
` })
      return message.send(`🔴 @id${id} (${chats[message.chatId].users[id].name}), бан навсегда\nЕсли хочешь вернуться, напиши [id${message.user}|забанившему модератору]\nИли [id${chats[message.chatId].owner}|создателю беседы]`);
    }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    let id = message.forwards[0].senderId;
  	let xyi = acc.find(x=>x.id === message.user);
     if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);
    if(chats[message.chatId].users[id].isBanned && chats[message.chatId].users[id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[id].name}) уже забанен.`)
        chats[message.chatId].banlength += 1;
        chats[message.chatId].users[id].isBanned = true;
        chats[message.chatId].users[id].permanently = true;
        chats[message.chatId].users[id].group = 0;
        vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: id });
                 vk.api.call('messages.send', { user_id: id, random_id: 0, message: `
[⚠] » Получена информация о бане в чате ${chats[message.chatId].title}
[🕛] » Время бана: ${data()} в ${time()}
[📗] » Вас забанил: @id${message.user} (${xyi.prefix})
[📙] » Вы забанены навсегда.
` })
      return message.send(`🔴 @id${perm_id} (${chats[message.chatId].users[perm_id].name}), бан навсегда\nЕсли хочешь вернуться, напиши [id${message.user}|забанившему модератору]\nИли [id${chats[message.chatId].owner}|создателю беседы]`);
    }


   if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
        if(res.object_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[res.object_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
  	let xyi = acc.find(x=>x.id === message.user);
      if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[res.object_id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);
      if(chats[message.chatId].users[res.object_id].isBanned && chats[message.chatId].users[res.object_id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[res.object_id].name}) уже забанен.`)
        chats[message.chatId].banlength += 1;
            chats[message.chatId].users[res.object_id].isBanned = true;
        chats[message.chatId].users[res.object_id].permanently = true;
        chats[message.chatId].users[res.object_id].group = 0;
        vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: res.object_id });
                 vk.api.call('messages.send', { user_id: res.object_id, random_id: 0, message: `
[⚠] » Получена информация о бане в чате ${chats[message.chatId].title}
[🕛] » Время бана: ${data()} в ${time()}
[📗] » Вас забанил: @id${message.user} (${xyi.prefix})
[📙] » Вы забанены навсегда.
` })
      return message.send(`🔴 @id${res.object_id} (${chats[message.chatId].users[res.object_id].name}), бан навсегда\nЕсли хочешь вернуться, напиши [id${message.user}|забанившему модератору]\nИли [id${chats[message.chatId].owner}|создателю беседы]`);
    })
  }else{
         let perm_id = message.$match[4];
     if(perm_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[perm_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
  	let xyi = acc.find(x=>x.id === message.user);
        if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[perm_id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);
      if(chats[message.chatId].users[perm_id].isBanned && chats[message.chatId].users[perm_id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[perm_id_id].name}) уже забанен.`)
        chats[message.chatId].banlength += 1;
        chats[message.chatId].users[perm_id].isBanned = true;
        chats[message.chatId].users[perm_id].permanently = true;
        chats[message.chatId].users[perm_id].group = 0;
        vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: perm_id });
                  vk.api.call('messages.send', { user_id: perm_id, random_id: 0, message: `
[⚠] » Получена информация о бане в чате ${chats[message.chatId].title}
[📗] » Вас забанил: @id${message.user} (${xyi.prefix})
[📙] » Вы забанены навсегда.
` })
      return message.send(`🔴 @id${perm_id} (${chats[message.chatId].users[perm_id].name}), бан навсегда\nЕсли хочешь вернуться, напиши [id${message.user}|забанившему модератору]\nИли [id${chats[message.chatId].owner}|создателю беседы]`);
}
});


vk.updates.hear(/^(.)(?:unban|разбан|разблокировать|разбанить)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
     if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
    let user = acc[user_id(message.user)];
   if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.unban) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.unban.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

     if(message.replyMessage){
    let id = message.replyMessage.senderId;
    if(message.replyMessage.senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    if(chats[message.chatId].users[id].isBanned == false && chats[message.chatId].users[id].permanently == false) return message.send(`@id${id} (${chats[message.chatId].users[id].name}) не заблокрован.`)
if(!chats[message.chatId].users[id].isBanned && chats[message.chatId].users[id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[id].name})не забанен.`)
        chats[message.chatId].banlength -= 1;
            if(chats[message.chatId].users[id].tban != 0){
        chats[message.chatId].users[id].tban = 0
      }
            chats[message.chatId].users[id].isBanned = false;
        chats[message.chatId].users[id].permanently = false;
        chats[message.chatId].users[id].group = 0;
        chats[message.chatId].users[id].reason = "";
      return message.send(`@id${id} (${chats[message.chatId].users[id].name}) - разбанен.`);
    }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    let id = message.forwards[0].senderId;
  if(chats[message.chatId].users[id].isBanned == false && chats[message.chatId].users[id].permanently == false) return message.send(`@id${id} (${chats[message.chatId].users[id].name}) не заблокрован.`)
      if(!chats[message.chatId].users[id].isBanned && chats[message.chatId].users[id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[id].name}) не забанен.`)
        chats[message.chatId].banlength -= 1;
            if(chats[message.chatId].users[id].tban != 0){
        chats[message.chatId].users[id].tban = 0
      }
            chats[message.chatId].users[id].isBanned = false;
        chats[message.chatId].users[id].permanently = false;
        chats[message.chatId].users[id].group = 0;
        chats[message.chatId].users[id].reason = "";
      return message.send(`@id${id} (${chats[message.chatId].users[id].name}) - разбанен.`);
    }

  if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
        let user = res;
    if(chats[message.chatId].users[user.object_id].isBanned == false && chats[message.chatId].users[user.object_id].permanently == false) return message.send(`@id${user.object_id} (${chats[message.chatId].users[user.object_id].name}) не заблокрован.`)
       if(!chats[message.chatId].users[user.object_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(!chats[message.chatId].users[user.object_id].isBanned && chats[message.chatId].users[user.object_id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[res.object_id].name}) не забанен.`)
        chats[message.chatId].banlength -= 1;
            if(chats[message.chatId].users[res.object_id].tban != 0){
        chats[message.chatId].users[res.object_id].tban = 0
      }
            chats[message.chatId].users[user.object_id].isBanned = false;
        chats[message.chatId].users[user.object_id].permanently = false;
        chats[message.chatId].users[user.object_id].group = 0;
        chats[message.chatId].users[user.object_id].reason = "";
      return message.send(`@id${user.object_id} (${chats[message.chatId].users[res.object_id].name}) - разбанен.`);
    })
  }else{
         let unban_id = message.$match[4];
     if(chats[message.chatId].users[unban_id].isBanned == false && chats[message.chatId].users[unban_id].permanently == false) return message.send(`@id${unban_id} (${chats[message.chatId].users[unban_id].name}) не заблокрован.`)
     if(!chats[message.chatId].users[unban_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
      if(!chats[message.chatId].users[unban_id].isBanned && chats[message.chatId].users[unban_id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[unban_id].name}) не забанен.`)
        chats[message.chatId].banlength -= 1;
      if(chats[message.chatId].users[unban_id].tban != 0){
        chats[message.chatId].users[unban_id].tban = 0
      }
            chats[message.chatId].users[unban_id].isBanned = false;
        chats[message.chatId].users[unban_id].permanently = false;
        chats[message.chatId].users[unban_id].group = 0;
        chats[message.chatId].users[unban_id].reason = "";
        return message.send(`@id${unban_id} (${chats[message.chatId].users[unban_id].name}) - разбанен.`);
}
});

vk.updates.hear(/^(.)(?:ban|бан|забанить)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
  let user = acc[user_id(message.user)];
  let a = m;
   if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.ban) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.ban.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

    if(message.replyMessage){
    let id = message.replyMessage.senderId;
    if(message.replyMessage.senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');

        if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);
         if(chats[message.chatId].users[id].isBanned && chats[message.chatId].users[id].permanently) return message.send('@id' + id + ' уже забанен.')
        chats[message.chatId].banlength += 1;
        chats[message.chatId].users[id].isBanned = true;
        chats[message.chatId].users[id].permanently = true;
        chats[message.chatId].users[id].group = 0;
        vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: id });
                   vk.api.call('messages.send', { user_id: id, random_id: 0, message: `
[⚠] » Получена информация о бане в чате ${chats[message.chatId].title}
[📗] » Вас забанил: @id${message.user} (${acc[user_id(message.user)].prefix})
[📙] » Вы забанены ${data()} в ${time()}
` })
      return message.send(`@id${id} (${chats[message.chatId].users[id].name}) - забанен.`);
    }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    let id = message.forwards[0].senderId;

     if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);
         if(chats[message.chatId].users[id].isBanned && chats[message.chatId].users[id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[id].name}) уже забанен.`)
        chats[message.chatId].banlength += 1;
            chats[message.chatId].users[id].isBanned = true;
        chats[message.chatId].users[id].permanently = true;
        chats[message.chatId].users[id].group = 0;
        vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: id });
                   vk.api.call('messages.send', { user_id: id, random_id: 0, message: `
[⚠] » Получена информация о бане в чате ${chats[message.chatId].title}
[📗] » Вас забанил: @id${message.user} (${acc[user_id(message.user)].prefix})
[📙] » Вы забанены ${data()} в ${time()}
` })
      return message.send(`@id${id} (${chats[message.chatId].users[id].name}) - забанен.`);
    }

  if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
        if(res.object_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[res.object_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);

          if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[res.object_id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);
      if(chats[message.chatId].users[res.object_id].isBanned && chats[message.chatId].users[res.object_id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[res.object_id].name}) уже забанен.`)
        chats[message.chatId].banlength += 1;
            chats[message.chatId].users[res.object_id].isBanned = true;
        chats[message.chatId].users[res.object_id].permanently = true;
        chats[message.chatId].users[res.object_id].group = 0;
        vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: res.object_id });
                   vk.api.call('messages.send', { user_id: res.object_id, random_id: 0, message: `
[⚠] » Получена информация о бане в чате ${chats[message.chatId].title}
[📗] » Вас забанил: @id${message.user} (${acc[user_id(message.user)].prefix})
[📙] » Вы забанены ${data()} в ${time()}
` })
      return message.send(`@id${res.object_id} (${chats[message.chatId].users[res.object_id].name}) - забанен.`);
    })
  }else{
         let perm_id = message.$match[4];
     if(perm_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[perm_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);

            if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[perm_id].group) return message.send(`❌ Нельзя забанить данного пользователя ❌`);
      if(chats[message.chatId].users[perm_id].isBanned && chats[message.chatId].users[perm_id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[id].name}) уже забанен.`)
        chats[message.chatId].banlength += 1;
            chats[message.chatId].users[perm_id].isBanned = true;
        chats[message.chatId].users[perm_id].permanently = true;
        chats[message.chatId].users[perm_id].group = 0;
        vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: perm_id });
                 vk.api.call('messages.send', { user_id: perm_id, random_id: 0, message: `
[⚠] » Получена информация о бане в чате ${chats[message.chatId].title}
[📗] » Вас забанил: @id${message.user} (${acc[user_id(message.user)].prefix})
[📙] » Вы забанены ${data()} в ${time()}
` })
      return message.send(`@id${perm_id} (${chats[message.chatId].users[perm_id].name}) - забанен.`);
}
});

vk.updates.hear(/^(.)(?:tempban|тбан|тзабанить|вбан|темпбан|бан на время)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)\s?([0-9]+)\s?([^]+)?$/i, message => {
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
   if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.tempban) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.tempban.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

    if(message.replyMessage){
    let id = message.replyMessage.senderId;
    if(message.replyMessage.senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');

     if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);
      if(chats[message.chatId].users[id].isBanned && chats[message.chatId].users[id].permanently) return message.send('@id' + id + ' уже забанен.')

        chats[message.chatId].users[id].tban = message.$match[7].toString().replace(/(м|минута|минуты|минут)/gi, `${message.$match[6] * 60}`).replace(/(ч|часа|часов|час)/gi, `${message.$match[6] * 3600}`).replace(/(д|дней|дня|дн)/gi, `${message.$match[6] * 86400}`)
        chats[message.chatId].users[id].isBanned = true;
        chats[message.chatId].users[id].permanently = true;
        chats[message.chatId].users[id].group = 0;
        chats[message.chatId].banlength += 1;
      return message.send(`@id${id} (${chats[message.chatId].users[id].name}) - забанен.`);
    }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
    let id = message.forwards[0].senderId;

     if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);
       if(chats[message.chatId].users[id].isBanned && chats[message.chatId].users[id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[id].name}) уже забанен.`)

        chats[message.chatId].users[id].tban = message.$match[7].toString().replace(/(м|минута|минуты|минут)/gi, `${message.$match[6] * 60}`).replace(/(ч|часа|часов|час)/gi, `${message.$match[6] * 3600}`).replace(/(д|дней|дня|дн)/gi, `${message.$match[6] * 86400}`)
        chats[message.chatId].users[id].isBanned = true;
        chats[message.chatId].users[id].permanently = true;
        chats[message.chatId].users[id].group = 0;
        chats[message.chatId].banlength += 1;
      return message.send(`@id${id} (${chats[message.chatId].users[id].name}) - забанен.`);
    }

  if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
        if(res.object_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[res.object_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);
   if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[res.object_id].group) return message.send(`❌ Нельзя забанить этого пользователя ❌`);

        chats[message.chatId].users[res.object_id].tban = message.$match[7].toString().replace(/(м|минута|минуты|минут)/gi, `${message.$match[6] * 60}`).replace(/(ч|часа|часов|час)/gi, `${message.$match[6] * 3600}`).replace(/(д|дней|дня|дн)/gi, `${message.$match[6] * 86400}`)
        chats[message.chatId].users[res.object_id].isBanned = true;
        chats[message.chatId].users[res.object_id].permanently = true;
        chats[message.chatId].users[res.object_id].group = 0;
        chats[message.chatId].banlength += 1;
      return message.send(`@id${res.object_id} (${chats[message.chatId].users[res.object_id].name}) - забанен.`);
    })
  }else{
         let perm_id = message.$match[4];
     if(perm_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[perm_id]) return message.send(`⚠ Не могу найти информацию о пользователе`);

      if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[perm_id].group) return message.send(`❌ Нельзя забанить данного пользователя ❌`);
      if(chats[message.chatId].users[perm_id].isBanned && chats[message.chatId].users[perm_id].permanently) return message.send(`@id${id} (${chats[message.chatId].users[id].name}) уже забанен.`)
        chats[message.chatId].users[perm_id].tban = message.$match[7].toString().replace(/(м|минута|минуты|минут)/gi, `${message.$match[6] * 60}`).replace(/(ч|часа|часов|час)/gi, `${message.$match[6] * 3600}`).replace(/(д|дней|дня|дн)/gi, `${message.$match[6] * 86400}`)
        chats[message.chatId].users[perm_id].isBanned = true;
        chats[message.chatId].users[perm_id].permanently = true;
        chats[message.chatId].banlength += 1;
        chats[message.chatId].users[perm_id].group = 0;
      return message.send(`@id${perm_id} (${chats[message.chatId].users[perm_id].name}) - забанен.`);
}
});

vk.updates.hear(/^(.)(?:kick|кик)(\s?https\:\/\/vk\.com\/)?(id|club|public)?([0-9]+)?([^]+)?$/i, (message) => {
        if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
let user = acc[user_id(message.user)];
if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.kick) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.kick.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

    if(message.replyMessage){
  let id = message.replyMessage.senderId;
    if(id > 0){
      if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[message.replyMessage.senderId].group) return message.send(`❌ Нельзя кикнуть данного пользователя ❌`);

   vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: id })
      return message.send(`@id${id} (${chats[message.chatId].users[id].name}) - исключен.`);
    }
      if(id < 0){
        message.send(`Вы успешно исключили группу @id${chats[message.chatId].groups[id].sname} (${chats[message.senderId].groups[id].name})`)
        vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: id })
      }
    }

     if(message.forwards[0]){
    let id = message.forwards[0].senderId;

    if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');

   if(id > 0){
    if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[message.forwards[0].senderId].group) return message.send(`❌ Нельзя кикнуть данного пользователя ❌`);

   vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: message.forwards[0].senderId })
  message.send(`[❌] » Пользователь @id${message.forwards[0].senderId} (${chats[message.chatId].users[message.forwards[0].senderId].name}) был исключен из беседы `);
  }
   if(id < 0){
        message.send(`Вы успешно исключили группу @id${chats[message.chatId].groups[id].sname} (${chats[message.senderId].groups[id].name})`)
         vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: id })
      }
  }

  if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((response) => {
    if(response.type == "user"){
    if(response.object_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
  let user = response;

       if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[response.object_id].group) return message.send(`❌ Нельзя кикнуть данного пользователя ❌`);

      vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: response.object_id })
      .catch((error) => {return message.send(`[⚠] » Ошибка. Возможные причины:\n[⚠] » В данной беседе группа не Администратор\n[⚠] » Такого игрока нет в беседе.`);
      });
                  message.send(`[❌] » Пользователь @id${user.object_id} (${chats[message.chatId].users[user.object_id].name}) был исключен из беседы `);
      return
      }

   if(response.type == "group"){
    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: "-"+response.object_id }).catch((error) => {return message.send(`[⚠] » Ошибка. Возможные причины:\n[⚠] » В данной беседе группа не Администратор\n[⚠] » Такого игрока нет в беседе.`);
      });
         return message.send(`Вы успешно исключили группу @${chats[message.chatId].groups[-response.object_id].sname} (${chats[message.chatId].groups[-response.object_id].name})`);
      }
    })
  }else{
     let kick_id = message.$match[4];
    if(message.$match[3].toLowerCase() == 'club' || message.$match[3].toLowerCase() == 'public'){
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: "-"+message.$match[4] })
       message.send(`Вы успешно исключили группу @${chats[message.chatId].groups[-message.$match[4]].sname} (${chats[message.chatId].groups[-message.$match[4]].name})`)
    }
    if(message.$match[3].toLowerCase() == 'id'){
     if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[kick_id].group) return message.send(`❌ Нельзя кикнуть данного пользователя ❌`);

    vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[4] }).
    catch((error) => {return message.send(`[⚠] » Ошибка. Возможные причины:\n[⚠] » В данной беседе группа не Администратор\n[⚠] » Такого игрока нет в беседе.`);});
          message.send(`[❌] » Пользователь @id${kick_id} (${chats[message.chatId].users[kick_id].name}) был исключен из беседы `);
    return
   }
  }
});

vk.updates.hear(/^(.)(?:warn|варн|заварнить)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
        if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
  let user = acc[user_id(message.user)];
      let chatid = message.chatId;
   if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.warn) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.warn.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

     if(message.replyMessage){
    let id = message.replyMessage.senderId;
    if(message.replyMessage.senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
       if(!chats[message.chatId].users[id]) return message.send(`❌ Участник не найден!`)
     if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);

      if(chats[message.chatId].users[id].isBanned == true) {
        return message.send('Пользователь и так уже заблокирован!');
      }
      if(chats[message.chatId].users[id].isBanned == false) {
        if(chats[message.chatId].users[id].warns >= 2) {
    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: id})
    message.send(`@id${id} (${chats[message.chatId].users[id].name}) был кикнут из беседы за большое количество нарушений, на ${timer(3600)}.`)
    chats[message.chatId].users[id].reason = "Ссылки на подозрительные ресурсы";
    chats[message.chatId].banlength += 1;
        chats[message.chatId].users[id].isBanned = true;
        chats[message.chatId].users[id].tban = 3600
    chats[message.chatId].users[id].warns = 0;
  }
 }
  if(chats[message.chatId].users[id].isBanned == false) {
        chats[message.chatId].users[id].warns += 1
       return message.send(`
@id${id} (${chats[message.chatId].users[id].name}) Вы получили предупреждение!!
Теперь у вас [${chats[message.chatId].users[id].warns}/${chats[message.chatId].setting.warns}] предупреждений `)
}
    }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
     let id = message.forwards[0].senderId;
    if(!chats[message.chatId].users[id]) return message.send(`❌ Участник не найден!`);
       if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);

      if(chats[message.chatId].users[id].isBanned == true) {
        return message.send('Пользователь и так уже заблокирован!');
      }
      if(chats[message.chatId].users[id].isBanned == false) {
        if(chats[message.chatId].users[id].warns >= 2) {
    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: id})
    message.send(`@id${id} (${chats[message.chatId].users[id].name}), был кикнут из беседы за большое количество нарушений, на ${timer(3600)}.`)
    chats[message.chatId].banlength += 1;
    chats[message.chatId].users[id].reason = "Ссылки на подозрительные ресурсы";
    chats[message.chatId].users[id].isBanned = true;
    chats[message.chatId].users[id].tban = 3600
    chats[message.chatId].users[id].warns = 0;
  }
 }
  if(chats[message.chatId].users[id].isBanned == false) {
        chats[message.chatId].users[id].warns += 1
      return message.send(`
@id${id} (${chats[message.chatId].users[id].name}) Вы получили предупреждение!!
Теперь у вас [${chats[message.chatId].users[id].warns}/${chats[message.chatId].setting.warns}] предупреждений `)
}
}

  if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
            let user = res;
        if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[res.object_id].group) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);
      if(user.object_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);

      if(chats[message.chatId].users[user.object_id].isBanned == true) {
        return message.send('Пользователь и так уже заблокирован!');
      }
      if(chats[message.chatId].users[user.object_id].isBanned == false) {
        if(chats[message.chatId].users[user.object_id].warns >= 2) {
    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: user.object_id})
    message.send(`@id${user.object_id} (${chats[message.chatId].users[user.object_id].name}), был кикнут из беседы за большое количество нарушений, на ${timer(3600)}.`)
    chats[message.chatId].banlength += 1;
    chats[message.chatId].users[user.object_id].reason = "Ссылки на подозрительные ресурсы";
    chats[message.chatId].users[user.object_id].isBanned = true;
    chats[message.chatId].users[res.object_id].tban = 3600
    chats[message.chatId].users[user.object_id].warns = 0;
  }
 }
  if(chats[message.chatId].users[user.object_id].isBanned == false) {
        chats[message.chatId].users[user.object_id].warns += 1
  return message.send(`
@id${user.object_id} (${chats[message.chatId].users[user.object_id].name}), Вы получили предупреждение!!
Теперь у вас [${chats[message.chatId].users[user.object_id].warns}/${chats[message.chatId].setting.warns}] предупреждений `)
}
    })
  }else{
         let warn_id = message.$match[4];
      if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[warn_id].group) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);
      if(warn_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[warn_id]) return message.send(`❌ Участник не найден!`);

      if(chats[message.chatId].users[warn_id].isBanned == true) {
        return message.send('Пользователь и так уже заблокирован!');
      }

      if(chats[message.chatId].users[warn_id].isBanned == false) {
        if(chats[message.chatId].users[warn_id].warns >= chats[message.chatId].setting.warns) {
    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: warn_id })
    message.send(`@id${warn_id} (${chats[message.chatId].users[warn_id].name}), был кикнут из беседы за большое количество нарушений.`)
    chats[message.chatId].banlength += 1;
    chats[message.chatId].users[warn_id].reason = "Ссылки на подозрительные ресурсы";
    chats[message.chatId].users[warn_id].isBanned = true;
    chats[message.chatId].users[warn_id].tban = 3600
    chats[message.chatId].users[warn_id].warns = 0;
  }
 }
  if(chats[message.chatId].users[warn_id].isBanned == false) {
        chats[message.chatId].users[warn_id].warns += 1
      return message.send(`
@id${warn_id} (${chats[message.chatId].users[warn_id].name}), Вы получили предупреждение!
Теперь у вас [${chats[message.chatId].users[warn_id].warns}/${chats[message.chatId].setting.warns}] предупреждений `)
}
}
});

vk.updates.hear(/^(?:@all|@online|@все|@онлайн)?$/i, (message) => {
  let user = acc[user_id(message.user)];
      let chatid = message.chatId;

     if(message.replyMessage){
    let id = message.replyMessage.senderId;
    if(message.replyMessage.senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
       if(!chats[message.chatId].users[id]) return message.send(`❌ Участник не найден!`)
     if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);

      if(chats[message.chatId].users[message.user].isBanned == true) {
        return message.send('Пользователь и так уже заблокирован!');
      }
      if(chats[message.chatId].users[message.user].isBanned == false) {
        if(chats[message.chatId].users[message.user].warns >= 2) {
    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: id})
    message.send(`@id${id} (${chats[message.chatId].users[id].name}) был забанен в беседе за большое количество нарушений, на ${timer(3600)}.`)
    chats[message.chatId].users[id].reason = "Использование all упоминаний";
    chats[message.chatId].banlength += 1;
        chats[message.chatId].users[message.user].isBanned = true;
        chats[message.chatId].users[message.user].tban = 3600
    chats[message.chatId].users[message.user].warns = 0;
  }
 }
  if(chats[message.chatId].users[message.user].isBanned == false) {
        chats[message.chatId].users[message.user].warns += 1
       return message.send(`
@id${id} (${chats[message.chatId].users[message.user].name}) Вы получили предупреждение!!
Теперь у вас [${chats[message.chatId].users[message.user].warns}/${chats[message.chatId].setting.warns}] предупреждений `)
}
    }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
     let id = message.forwards[0].senderId;
    if(!chats[message.chatId].users[id]) return message.send(`❌ Участник не найден!`);
       if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[id].group) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);

      if(chats[message.chatId].users[id].isBanned == true) {
        return message.send('Пользователь и так уже заблокирован!');
      }
      if(chats[message.chatId].users[id].isBanned == false) {
        if(chats[message.chatId].users[id].warns >= 2) {
    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: id})
    message.send(`@id${id} (${chats[message.chatId].users[id].name}), был кикнут из беседы за большое количество нарушений, на ${timer(3600)}.`)
    chats[message.chatId].banlength += 1;
    chats[message.chatId].users[message.user].reason = "Использование all упоминаний";
    chats[message.chatId].users[message.user].isBanned = true;
    chats[message.chatId].users[message.user].tban = 3600
    chats[message.chatId].users[message.user].warns = 0;
  }
 }
  if(chats[message.chatId].users[message.user].isBanned == false) {
        chats[message.chatId].users[message.user].warns += 1
      return message.send(`
@id${id} (${chats[message.chatId].users[message.user].name}) Вы получили предупреждение!!
Теперь у вас [${chats[message.chatId].users[message.user].warns}/${chats[message.chatId].setting.warns}] предупреждений `)
}
}

  if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
            let user = res;
        if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[res.object_id].group) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);
      if(user.object_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);

      if(chats[message.chatId].users[user.object_id].isBanned == true) {
        return message.send('Пользователь и так уже заблокирован!');
      }
      if(chats[message.chatId].users[user.object_id].isBanned == false) {
        if(chats[message.chatId].users[user.object_id].warns >= 2) {
    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: user.object_id})
    message.send(`@id${user.object_id} (${chats[message.chatId].users[user.object_id].name}), был кикнут из беседы за большое количество нарушений, на ${timer(3600)}.`)
    chats[message.chatId].banlength += 1;
    chats[message.chatId].users[user.object_id].reason = "Ссылки на подозрительные ресурсы";
    chats[message.chatId].users[user.object_id].isBanned = true;
    chats[message.chatId].users[res.object_id].tban = 3600
    chats[message.chatId].users[user.object_id].warns = 0;
  }
 }
  if(chats[message.chatId].users[user.object_id].isBanned == false) {
        chats[message.chatId].users[user.object_id].warns += 1
  return message.send(`
@id${user.object_id} (${chats[message.chatId].users[user.object_id].name}), Вы получили предупреждение!!
Теперь у вас [${chats[message.chatId].users[user.object_id].warns}/${chats[message.chatId].setting.warns}] предупреждений `)
}
    })
  }else{
         let warn_id = message.$match[4];
      if(chats[message.chatId].users[message.user].group < chats[message.chatId].users[warn_id].group) return message.send(`❌ Нельзя сделать предупреждение этому игроку ❌`);
      if(warn_id == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      if(!chats[message.chatId].users[warn_id]) return message.send(`❌ Участник не найден!`);

      if(chats[message.chatId].users[warn_id].isBanned == true) {
        return message.send('Пользователь и так уже заблокирован!');
      }

      if(chats[message.chatId].users[warn_id].isBanned == false) {
        if(chats[message.chatId].users[warn_id].warns >= chats[message.chatId].setting.warns) {
    vk.api.call("messages.removeChatUser", {chat_id: chatid, user_id: warn_id })
    message.send(`@id${warn_id} (${chats[message.chatId].users[warn_id].name}), был кикнут из беседы за большое количество нарушений.`)
    chats[message.chatId].banlength += 1;
    chats[message.chatId].users[warn_id].reason = "Ссылки на подозрительные ресурсы";
    chats[message.chatId].users[warn_id].isBanned = true;
    chats[message.chatId].users[warn_id].tban = 3600
    chats[message.chatId].users[warn_id].warns = 0;
  }
 }
  if(chats[message.chatId].users[warn_id].isBanned == false) {
        chats[message.chatId].users[warn_id].warns += 1
      return message.send(`
@id${warn_id} (${chats[message.chatId].users[warn_id].name}), Вы получили предупреждение!
Теперь у вас [${chats[message.chatId].users[warn_id].warns}/${chats[message.chatId].setting.warns}] предупреждений `)
}
}
});

vk.updates.hear(/^(.)(?:unwarn|унварн|убратьварн|убрать предупреждение)(\shttps\:\/\/vk\.com\/)?(id|club)?([0-9]+)?([^]+)?$/i, message => {
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
let user = acc[user_id(message.user)];
       let chatid = message.chatId
   if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.unwarn) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.unwarn.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

    if(message.replyMessage){
    let id = message.replyMessage.senderId;
    if(chats[message.chatId].users[id].warns == 0) return message.send(`У @id${id} (${chats[message.chatId].users[id].name}) нет предупреждений .`)
    if(message.replyMessage.senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
      chats[message.chatId].users[id].warns = 0
        return message.send(`@id${id} (${chats[message.chatId].users[id].name}) теперь у вас 0 предупреждений`)
  }

     if(message.forwards[0]){
     if(message.forwards[0].senderId == 598958885 && message.user == 35543922) return message.reply('[⚠] » Отказ');
     let id = message.forwards[0].senderId;
   if(chats[message.chatId].users[id].warns == 0) return message.send(`У @id${id} (${chats[message.chatId].users[id].name}) нет предупреждений .`)
    chats[message.chatId].users[id].warns = 0
    return message.send(`@id${id} (${chats[message.chatId].users[id].name}) теперь у вас 0 предупреждений`)
  }

  if(message.$match[5]) {
    var domain = message.$match[5].split(" ");
    vk.api.call("utils.resolveScreenName", {
    screen_name: message.$match[5]
  }).then((res) => {
            let user = res;
      if(chats[message.chatId].users[user.object_id].warns == 0) return message.send(`У @id${user.object_id} (${chats[message.chatId].users[user.object_id].name}) нет предупреждений .`)
      if(!chats[message.chatId].users[user.object_id]) return message.send(`❌ Участник не найден!`);
      chats[message.chatId].users[user.object_id].warns = 0
      return message.send(`@id${user.object_id} (${chats[message.chatId].users[res.object_id].name}) теперь у вас 0 предупреждений`);
    })
  }else{
         let warn_id = message.$match[4];
     if(chats[message.chatId].users[warn_id].warns == 0) return message.send(`У @id${warn_id} (${chats[message.chatId].users[warn_id].name}) нет предупреждений .`)
     if(!chats[message.chatId].users[warn_id]) return message.send(`❌ Участник не найден!`);
      chats[message.chatId].users[warn_id].warns = 0
      return message.send(`@id${warn_id} (${chats[message.chatId].users[warn_id].name}) теперь у вас 0 предупреждений`);
}
});

vk.updates.hear(/^(.)(?:title|name|название)\s?([^]+)?$/i, (message) => {
  if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
 let user = acc[user_id(message.user)];
 let chatid = message.chatId;
 if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.title) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.title.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
  chats[chatid].title = message.$match[2]
   vk.api.messages.editChat({ chat_id: chatid, title: message.$match[2] })
   message.send(`Вы успешно сменили название чата на ${message.$match[2]}`)
})

vk.updates.hear(/^(?:givegold|addgold|bgold|золотой|золото)\s?([0-9]+)?$/i, (message) => {
  if(message.user !== 598958885 && message.user !== 35543922) return;
 if(chats[message.$match[1]].bgold == true) return message.send(`У этой беседы уже имеется золотой статус`);
 if(!message.$match[1]) return;
 if(!chats[message.$match[1]]) return message.send(`Беседа не найдена`);
 chats[message.$match[1]].bgold = true
 message.send(`Беседа #${message.$match[1]} успешно получила золотой статус`);
 vk.api.call('messages.send', { chat_id: message.$match[1], random_id: 0, message: `🔔 Поздравляем!\nАгент Поддержки выдал вашей беседе Золотой статус.\nТеперь вы можете использовать уникальные функции доступные Золотым беседам.` })
});

vk.updates.hear(/^(?:агенты)$/i, async (message, args, bot) => {
let text, chat;
text = '\nСписок всех агентов поддержки:\n';
for (let id in acc) {
if(acc[id]){
let user = acc[id];

if (user.role == 1) text += `✅ » @id${acc[id].id} (${acc[id].prefix})\n`;
}
}
return message.send(`${text}`);
});

vk.updates.hear(/^(?:админы)$/i, async (message, args, bot) => {
let text, chat;
text = '\nСписок всех админов:\n';
for (let id in acc) {
if(acc[id]){
let user = acc[id];

if (user.role == 2) text += `✅ » @id${acc[id].id} (${acc[id].prefix})\n`;
}
}
return message.send(`${text}`);
});

vk.updates.hear(/^(?:takegold|tgold|removegold|забрать золотой)\s?([0-9]+)?$/i, (message) => {
  if(message.user !== 598958885 && message.user !== 35543922) return;
 if(chats[message.$match[1]].bgold == false) return message.send(`У этой беседы нет золотого статуса`);
 if(!message.$match[1]) return;
 if(!chats[message.$match[1]]) return message.send(`Беседа не найдена`);
 chats[message.$match[1]].bgold = false
 message.send(`Беседа #${message.$match[1]} теперь без золотого статуса`);
});

vk.updates.hear(/^(?:!купить голд)\s?([0-9]+)?$/i, (message) => {
 if(chats[message.$match[1]].bgold == true) return message.send(`[⚠] » У данного чата есть уже gold`);
 if(chats[message.$match[1]].cookies < 1000) return message.send(`[😭] » Не хватает средств на GOLD-статус!\nУчаствуйте в акциях из группы, и получайте печеньки!`);
 if(!message.$match[1]) return;
 if(!chats[message.$match[1]]) return message.send(`[⛔] » Чат не обнаружен \n Введите ID беседы из "${chats[message.chatId].prefix}статистика". \n Не идентефикатор!`);
 chats[message.$match[1]].bgold = true
 chats[message.chatId].cookies -= 1000
 message.send(`[ 🥳 ] Вы успешно приобрели GOLD-статус для беседы [Id: ${message.$match[1]}]! \n[ 🤝🏻 ] Спасибо за работу с ботом 🥰`);
});

vk.updates.hear(/^(?:мешочек|баланс|мешок)$/i, (message) => {
let userid = acc.find(x=>x.id === message.user);
if(userid.money == 0) return message.send(`💰 Ваш мешок пока пуст.\n\n💬 Чтобы пополнить мешок, введите "купить {число}"`);
message.send(`💰 В Вашем мешке есть:\n🍪 ${userid.money} печенек\n\nЗапасы также можно узнать в ЛС группы или пополнить, введя команду "купить {число}"`);
});

vk.updates.hear(/^(?:givemoney)\s(.*)$/i, async (message, bot) => {
  let us = await GetIdUser(message.$match[1]);
  let uid = acc.find(x=>x.id === us);
  let msguser = acc.find(x=>x.id === message.user);
	if(msguser.role == 0) return message.send(`У вас нет прав чтобы назначать агентов`);
	let user;
  uid.money += 1000
	return message.send(`Пользователю выдано 1000 печенек.`)
});

vk.updates.hear(/^(?:add scam)\s(.*)$/i, async (message, bot) => {
  let us = await GetIdUser(message.$match[1]);
  let uid = acc.find(x=>x.id === us);
  let msguser = acc.find(x=>x.id === message.user);
	if(msguser.role !== 2) return message.send(`У вас нет прав`);
	let user;
  uid.scam = 1
	return message.send(`Пользователь добавлен в базу.`)
});

vk.updates.hear(/^(?:add agent)\s(.*)$/i, async (message, bot) => {
  let us = await GetIdUser(message.$match[1]);
  let uid = acc.find(x=>x.id === us);
  let msguser = acc.find(x=>x.id === message.user);
	if(msguser.role !== 2) return message.send(`У вас нет прав чтобы назначать агентов`);
	let user;
  uid.role = 1
  uid.online = false
	return message.send(`Пользователь назначен агентом поддержки.`)
});

vk.updates.hear(/^(?:uninvite)\s(.*)$/i, async (message, bot) => {
  let us = await GetIdUser(message.$match[1]);
  let uid = acc.find(x=>x.id === us);
  let msguser = acc.find(x=>x.id === message.user);
	if(msguser.role !== 2) return message.send(`У вас нет прав чтобы назначать агентов`);
	let user;
  uid.role = 0
  uid.online = false
	return message.send(`Пользователь снят.`)
});

vk.updates.hear(/^(?:add admin)\s(.*)$/i, async (message, bot) => {
	if(message.senderId !== 35543922) return message.send(`У вас нет прав чтобы назначать агентов`);
	let us = await GetIdUser(message.$match[1])
	userid = await GetIdUser(message.$match[1]);
  let uid = acc.find(x=>x.id === us);
	let user;
  uid.role = 2
  uid.online = false
	return message.send(`Пользователь назначен администратором.`)
});

vk.updates.hear(/^(?:!передать)\s?([^]+)?$/i, (message) => {
if(chats[message.chatId].cookies < message.$match[2]) return message.send(`[😭] » Не хватает средств для передачи!`);
if(!message.$match[1] && !message.$match[2]) return;
//chats[message.$match[1]].cookies + message.$match[2]
chats[message.chatId].cookies - message.$match[2]
message.send(`[ 🥳 ] Беседа успешно полчила ваши печеньки!\n ID беседы: ${message.$match[1]}`);
});

vk.updates.hear(/^(?:!купить префикс)\s?([^]+)?$/i, (message) => {
 if(chats[message.$match[1]].cookies < 500) return message.send(`[😭] » Не хватает средств на смену префикса (кастомный)!\nУчаствуйте в акциях из группы, и получайте печеньки!`);
 if(!message.$match[1]) return;
 chats[message.chatId].prefix = "${message.$match[1]}"
 chats[message.chatId].cookies -= 500
 message.send(`[ 🥳 ] Вы успешно приобрели кастомный префикс "${message.$match[1]}" для своей беседы за 500 печенек! \n[ 🤝🏻 ] Спасибо за работу с ботом 🥰`);
});


vk.updates.hear(/^(?:!удалить голд)\s?([0-9]+)?$/i, (message) => {
 if(chats[message.chatId].bgold == false) return message.send(`[⚠] » У данного чата нет gold`);
 if(!message.$match[1]) return;
 chats[message.$match[1]].bgold = false
 chats[message.$match[1]].cookies += 5
 message.send(`[ 🥳 ] Вы успешно удалили голд статус беседе.`);
});

vk.updates.hear(/^(?:обнулить)\s?([0-9]+)?$/i, (message) => {
  if(message.user !== 598958885 && message.user !== 35543922) return;
 if(!message.$match[1]) return;
 if(!chats[message.$match[1]]) return message.send(`[⛔] » Чат не обнаружен`);
 chats[message.$match[1]].bgold = false
 chats[message.$match[1]].cookies = 0
 message.send(`Чат был обнулен.\n GOLD-статус, печеньки, были удалены.\nПовторное нарушение правил приведет к добавлению беседы и её владельца в чс группы, и чат-менджера.`);
});

vk.updates.hear(/^(.)(?:event|events|settings|события)$/i, (message) => {
 if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
 let user = acc[user_id(message.user)];
 let chatid = message.chatId;
if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.event) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.event.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
  if(chats[chatid].bgold == false) return message.send(`Данная функция доступна для Золотых бесед`);
  /*(message.text.match(/^(?:!settings|!event|!events|!события)$/i)){*/
 message.send(`
[📝] » Настройки беседы
 Могут ли участники приглашать людей — ${chats[chatid].settings.invite.toString().replace(/true/gi, "Да").replace(/false/gi, "Нет")}
  Изменить: "event invite (on|off)"
➖➖➖➖
 Будут ли кикнуты участники после выхода — ${chats[chatid].settings.kick_leave.toString().replace(/true/gi, "Да").replace(/false/gi, "Нет")}
  Изменить: "event kickleave (on|off)"
➖➖➖➖
 Предупреждение за ссылку — ${chats[chatid].settings.url.toString().replace(/true/gi, "Включено").replace(/false/gi, "Выключено")}
  Изменить: "event linkwarn (on|off)"
➖➖➖➖
 Режим тишины — ${chats[chatid].settings.mute.toString().replace(/true/gi, "Включен").replace(/false/gi, "Выключен")}
  Изменить: "event chatmute (on|off)"
➖➖➖➖
 Антиспам база — ${chats[chatid].settings.mute.toString().replace(/true/gi, "Включена").replace(/false/gi, "Выключена")}
  Изменить: "event антиспам (on|off)"
➖➖➖➖
 Группы будут кикнуты после приглашения: ${chats[chatid].settings.protectgroup1.toString().replace(/true/gi, "Включено").replace(/false/gi, "Выключено")}
   Изменить: "event kickgroup (on|off)"
`)
});

vk.updates.hear(/^(?:-ссылки|-сайты)$/i, (message) => {
chats[message.chatId].settings.url = true
message.send(`❎ Ссылки на сайты в этой беседе теперь запрещены`);
});

vk.updates.hear(/^(.)(?:ссылки|сайты)$/i, (message) => {
if(message.$match[1] !== '+') return;
chats[message.chatId].settings.url = false
message.send(`✅ Ссылки на сайты в этой беседе теперь разрешены`);
});

vk.updates.hear(/^(?:-беседы|-беседа)$/i, (message) => {
chats[message.chatId].settings.url = true
message.send(`❎ Ссылки на сайты в этой беседе теперь запрещены`);
});

vk.updates.hear(/^(.)(?:беседы|беседа)$/i, (message) => {
if(message.$match[1] !== '+') return;
chats[message.chatId].settings.url = false
message.send(`✅ Ссылки на сайты в этой беседе теперь разрешены`);
});

vk.updates.hear(/^(?:-Группы|-Группа)$/i, (message) => {
chats[message.chatId].settings.protectgroup1 = true
message.send(`❎ Ссылки на сайты в этой беседе теперь запрещены`);
});

vk.updates.hear(/^(.)(?:Группы|Группа)$/i, (message) => {
if(message.$match[1] !== '+') return;
chats[message.chatId].settings.protectgroup1 = false
message.send(`✅ Ссылки на сайты в этой беседе теперь разрешены`);
});

 vk.updates.hear(/^(.)(?:event|events|settings|события)\s([^]+)\s([^]+)$/i, (message) => {
    let chatid = message.chatId;
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
      if(chats[chatid].bgold == false) return message.send(`📝 Данная функция доступна только для Золотой беседы`);
      if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.event) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.event.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

              if(message.$match[2].toLowerCase() == "invite") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.invite = true
                  message.send("Теперь участники могут приглашать людей в конференцию.")
                }
                else if(message.$match[3].toLowerCase() == "off") {
                   chats[chatid].settings.invite = false
                  msg.send("Теперь участники не могут приглашать людей в конференцию.")
                }
              }
            else if(message.$match[2].toLowerCase() == "kickleave") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.kick_leave = true
                  message.send("Теперь участники будут кикнуты после выхода из беседы.")
                }
                else if(message.$match[3].toLowerCase() == "off") {
                  chats[chatid].settings.kick_leave = false
                  message.send("Теперь участники не будут кикнуты после выхода из беседы.")
                }
              }
              else if(message.$match[2].toLowerCase() == "linkwarn") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.url = true
                  message.send("Теперь участники получат предупреждение при отправке ссылки на беседу.")
                }
                else if(message.$match[3].toLowerCase() == "off") {
                  chats[chatid].settings.url = false
                  message.send("Теперь участники не получат предупреждение при отправке ссылки на беседу.")
                }
              }
                else if(message.$match[2].toLowerCase() == "chatmute") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.mute = true
                  message.send(`Модератор включил режим тишины.\n\nВсе обычные пользователи будут исключены из беседы при отправке сообщений.`)
                }
                else if(message.$match[3].toLowerCase() == "off") {
                  chats[chatid].settings.mute = false
                  message.send(`Модератор отключил режим тишины.\n\nВсе обычные пользователи снова могут отправлять сообщения`)
                }
              } else if(message.$match[2].toLowerCase() == "kickgroup") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.protectgroup1 = true
                  message.send(`Теперь группа после приглашения будет исключена.`)
                }
                else if(message.$match[3].toLowerCase() == "off") {
                  chats[chatid].settings.protectgroup1 = false
                  message.send("Теперь группа после приглашения не будет исключена.")
                }
              }
});

vk.updates.hear(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig, (message) => {
  if(!message.isChat) return;
      let chatid = message.chatId;
      let user = chats[chatid].users[message.user];
            if(chats[chatid].bgold == true){
             if(chats[chatid].settings.url == true){
          if(chats[message.chatId].users[message.user].isBanned == true) {
        return message.send('...');
      }

      if(user.group == 0){
        user.warns += 1;
        message.send(`
@id${message.user} (${user.name}), вы получили предупреждение за подозрительные ссылки!
Количество предупреждений: [${user.warns}/${chats[chatid].setting.warns}]`)
        if(user.warns >= chats[chatid].setting.warns){
         user.reason = "Подозрительные ссылки"
         user.isBanned = true
         user.warns = 0
         chats[message.chatId].banlength += 1;
         vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
         message.send(`@id${message.user} (${user.name}), был исключен по причине: "Подозрительные ссылки"`)
        }
      }

     }
    }
});

//-------------------------------------------------------------------------------



//------------------------------------------------------------------------------------\\
//------------------------------------------------------------------------------------\\
function rand(min, max) {return Math.round(Math.random() * (max - min)) + min}
//------------------------------------------------------------------------------------\\
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
//------------------------------------------------------------------------------------
function spaces(string) {
  if (typeof string !== "string") string = string.toString();
  return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};

function scl(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

function timer(seconds) {
    if(seconds == "") return "0 секунд"
    var days = parseInt(seconds/86400);
    seconds = seconds%86400;
    var hours = parseInt(seconds/3600 );
    seconds = seconds%3600;
    var minutes = parseInt(seconds/60);
    seconds = seconds%60;
    days = (days == 0 ? "" : days + " " + scl(days, ["день", "дня", "дней"]))
    hours = (hours == 0 ? "" : hours + " " + scl(hours, ["час", "часа", "часов"]))
    minutes = (minutes == 0 ? "" : minutes + " " + scl(minutes, ["минуту", "минуты", "минут"]))
    seconds = (seconds == 0 ? "" : seconds + " " + scl(seconds, ["секунду", "секунды", "секунд"]))
    //var gone = days + " " +hours + " " + minutes + " " + seconds
    return `${days} ${hours} ${minutes} ${seconds}`
};

function repl(num){
  var sjop = nuchats[message.chatId].users[message.user].replace(/(k|K|К|к)/ig, "000")
   sjop = sjop.replace(/(все|Все|Всё|всё)/ig, i.money)
  return [sjop]
};

function fix(num) {
num = Number(num)
num = nuchats[message.chatId].users[message.user].toFixed(0)
num = Number(num)
return [num]
}
//------------------------------------------------------------------------------------\\
function randomUid() {
  var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var randomString = ""
  for (var i = 0; i < 8; i++) {
    if(i == 4 || i == 4) {
      randomString += "-"
    }
    else {
      var randomPoz = Math.floor(Math.random() * charSet.length)
      randomString += charSet.substring(randomPoz, randomPoz + 1)
    }
  }
  return randomString
}
//------------------------------------------------------------------------------------\\
Array.prototype.random = function() {
  return this[Math.floor(this.length * Math.random())];
}
 //------------------------------------------------------------------------------------\\
 function user_id(id) {
   let ids = 6
   if(uid[id]){
     ids = uid[id].id
   }
   return ids;
 }
  //------------------------------------------------------------------------------------\\
  var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\
  setInterval(() => {
    uptime.sec++;
    if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
    if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
    if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
  }, 1000);
//------------------------------------------------------------------------------------\\
   function time() {
      let date = new Date();
      let days = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      var times = hours + ':' + minutes + ':' + seconds
      return times;
  }

function time2() {
      let date = new Date();
      let days = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      var times = hours + ':' + minutes
      return times;
  }

function restart() {
 process.exit(-1)
return `Готово`
};

 //------------------------------------------------------------------------------------\\
  function data() {
    var date = new Date();
    let days = date.getDate();
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    if (days < 10) days = "0" + days;
    var datas = days + '.' + month + '.2021' ;
    return datas;
  }
 //------------------------------------------------------------------------------------\\

// Утилита
const utils = {
  sp: (int) => {
    int = int.toString();
    return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
  },
  tx: (int) => {
    int = int.toString();
    return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
  },
  rn: (int, fixed) => {
    if (int === null) return null;
    if (int === 0) return '0';
    fixed = (!fixed || fixed < 0) ? 0 : fixed;
    let b = (int).toPrecision(2).split('e'),
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
      c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
      d = c < 0 ? c : Math.abs(c),
      e = d + ['', 'тыс', 'млн', 'млрд', 'трлн'][k];

      e = e.replace(/e/g, '');
      e = e.replace(/\+/g, '');
      e = e.replace(/Infinity/g, 'Бесконечно');

    return e;
  },
  gi: (int) => {
    int = int.toString();

    let text = ``;
    for (let i = 0; i < int.length; i++)
    {
      text += `${int[i]}&#8419;`;
    }

    return text;
  },
  decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
  random: (x, y) => {
    return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
  },
  pick: (array) => {
    return array[utils.random(array.length - 1)];
  }
}

// ------------------------------------------ \\

function getUnix() {
  return Date.now();
}

//-------------------------------------------------------------------------------------\\

function unixStamp(stamp) {
  let date = new Date(stamp),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
    mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
    secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

  return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

//------------------------------------------------------------------------------------\\

function unixStampLeft(stamp) {
  stamp = stamp / 1000;

  let s = stamp % 60;
  stamp = ( stamp - s ) / 60;

  let m = stamp % 60;
  stamp = ( stamp - m ) / 60;

  let h = ( stamp ) % 24;
  let d = ( stamp - h ) / 24;

  let text = ``;

  if(d > 0) text += Math.floor(d) + " д. ";
  if(h > 0) text += Math.floor(h) + " ч. ";
  if(m > 0) text += Math.floor(m) + " мин. ";
  if(s > 0) text += Math.floor(s) + " с.";

  return text;
}
//----------------------------------------------------------//

function getRandomElement(array) {
return array[getRandomInt(array.lenght - 1)];
}


function getRandomElement(array) {
return array[getRandomInt(array.length - 1)];
}

function getRandomInt(x, y) {
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
}

/*vk.updates.hear(/^(.)(?:event|events|settings|события)$/i, (message) => {
 if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
 let user = acc[user_id(message.user)];
 let chatid = message.chatId;
if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.event) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.event.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);
  if(chats[chatid].bgold == false) return message.send(`Данная функция доступна для Золотых бесед`);
  (message.text.match(/^(?:!settings|!event|!events|!события)$/i)){
 message.send(`
[📝] » Настройки беседы
 Могут ли участники приглашать людей — ${chats[chatid].settings.invite.toString().replace(/true/gi, "Да").replace(/false/gi, "Нет")}
  Изменить: "event invite (on|off)"
➖➖➖➖
 Будут ли кикнуты участники после выхода — ${chats[chatid].settings.kick_leave.toString().replace(/true/gi, "Да").replace(/false/gi, "Нет")}
  Изменить: "event kickleave (on|off)"
➖➖➖➖
 Предупреждение за ссылку — ${chats[chatid].settings.url.toString().replace(/true/gi, "Включено").replace(/false/gi, "Выключено")}
  Изменить: "event linkwarn (on|off)"
➖➖➖➖
 Режим тишины — ${chats[chatid].settings.mute.toString().replace(/true/gi, "Включен").replace(/false/gi, "Выключен")}
  Изменить: "event chatmute (on|off)"
➖➖➖➖
 Группы будут кикнуты после приглашения: ${chats[chatid].protectgroup1.toString().replace(/true/gi, "Включено").replace(/false/gi, "Выключено")}
   Изменить: "event kickgroup (on|off)"
`)
});

 vk.updates.hear(/^(.)(?:event|events|settings|события)\s([^]+)\s([^]+)$/i, (message) => {
    let chatid = message.chatId;
    if(!message.isChat) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), пожалуйста, напишите эту команду в беседе.`);
  if(message.$match[1] !== '!' && message.$match[1] !== '.') return;
if(chats[message.chatId].tex == true) return message.send(`@id${message.user} (${chats[message.chatId].users[message.user].name}), на данный момент в беседе технический перерыв.`);
      if(chats[chatid].bgold == false) return message.send(`Данная функция доступна для Золотых бесед`);
      if(chats[message.chatId].users[message.user].group < chats[message.chatId].dostup.event) return message.send(`📝 Команда доступна только с ранга ${chats[message.chatId].dostup.event.toString().replace(/1/gi, "Младшего модератора").replace(/2/gi, "Старшего модератора").replace(/3/gi, "Младшего админа").replace(/4/gi, "Старшего админа").replace(/5/gi, "Создателя")}`);

              if(message.$match[2].toLowerCase() == "invite") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.invite = true
                  message.send("Теперь участники могут приглашать людей в конференцию.")
                }
                else if(message.$match[3].toLowerCase() == "off") {
                   chats[chatid].settings.invite = false
                  msg.send("Теперь участники не могут приглашать людей в конференцию.")
                }
              }
            else if(message.$match[2].toLowerCase() == "kickleave") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.kick_leave = true
                  message.send("Теперь участники будут кикнуты после выхода из беседы.")
                }
                else if(message.$match[3].toLowerCase() == "off") {
                  chats[chatid].settings.kick_leave = false
                  message.send("Теперь участники не будут кикнуты после выхода из беседы.")
                }
              }
              else if(message.$match[2].toLowerCase() == "linkwarn") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.url = true
                  message.send("Теперь участники получат предупреждение при отправке ссылки на беседу.")
                }
                else if(message.$match[3].toLowerCase() == "off") {
                  chats[chatid].settings.url = false
                  message.send("Теперь участники не получат предупреждение при отправке ссылки на беседу.")
                }
              }
                                     else if(message.$match[2].toLowerCase() == "chatmute") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.mute = true
                  message.send(`[❌] » Режим тишины активирован \nПисать в чате можно с роли: "Администратор"`)
                }
                else if(message.$match[3].toLowerCase() == "off") {
                  chats[chatid].settings.mute = false
                  message.send("[✔] » Режим тишины де активирован\n Писать в чате могут все.")
                }
              } else if(message.$match[2].toLowerCase() == "kickgroup") {
                if(message.$match[3].toLowerCase() == "on") {
                  chats[chatid].settings.protectgroup1 = true
                  message.send(`Теперь группа после приглашения будет исключена.`)
                }
                else if(message.$match[3].toLowerCase() == "off") {
                  chats[chatid].settings.protectgroup1 = false
                  message.send("Теперь группа после приглашения не будет исключена.")
                }
              }
});

 vk.updates.on(['chat_invite_user'], async (message, next) => {
    if(message.eventMemberId > 0){

   if(chats[message.chatId].settings.invite == false){
    let user = await vk.api.users.get({user_id: message.eventMemberId})

    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.eventMemberId })

    message.send(`@id${message.eventMemberId} (${user[0].first_name} ${user[0].last_name}), исключен.\nАдминистратор запретил приглашать в беседу.`)
    vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.user })
   }

   if(chats[message.chatId].settings.invite == true){
    let count = 0;
    let text = ``;
   let user = await vk.api.users.get({user_id: message.eventMemberId})
  count += 1;

    if(count == 1){
    text += `@id${message.eventMemberId} (${user[0].first_name} ${user[0].last_name}), `

    return message.send(`${text}${chats[message.chatId].motd}`)
    }

    if(count < 2){
     text += `@id${message.eventMemberId} (${user[0].first_name} ${user[0].last_name}), `

    return message.send(`${text}${chats[message.chatId].motd}`)
   }

    if(chats[message.chatId].users[message.eventMemberId].isBanned && chats[message.chatId].users[message.eventMemberId].permanently){

        vk.api.call("messages.removeChatUser", {chat_id: message.chatId, member_id: message.eventMemberId });
        return message.send(`@id${message.eventMemberId} (${user[0].first_name} ${user[0].last_name}) - находится в бане`+(chats[message.chatId].tban < 1 ? `.` : `, до разбана ${timer(chats[message.chatId].users[message.eventMemberId].tban)}`)+``);}
    }
  }

    if(message.eventMemberId < 0){

     if(chats[message.chatId].settings.protectgroup1 == true){
      vk.api.messages.removeChatUser({ chat_id: message.chatId, member_id: message.eventMemberId })
      message.send(`[SYSTEM] => PROTECTION GROUP: INCLUDED\n&#8195;[SUCCESS] => THE GROUP WAS DELETED`)
     }

    if(chats[message.chatId].settings.protectgroup1 == false){
      vk.api.groups.getById({ group_ids: message.eventMemberId, fields: "city,country,place,description,wiki_page,market,members_count,counters,start_date,finish_date,can_post,can_see_all_posts,activity,status" }).then(function(response){
      let c = response[0];
      if(!chats[message.chatId].groups[message.eventMemberId]){
         chats[message.chatId].groups[message.eventMemberId] = {
           id: "-"+ message.eventMemberId,
           name: c.name,
           sname: c.screen_name,
           msg: 0,
           symbols: 0,
           warns: 0,
           timeban: 0,
           ban: false,
           permban: false
         }

      }

      message.send(`В конференцию была добавлена группа: @id${c.id} (${c.name})\n[Подписчики] => ${c.members_count}\n[Статус] => ${c.description}`)
      })
     }

    }

    await next();

  });
*/
