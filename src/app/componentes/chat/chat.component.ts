import { chat } from './../../servicos/chats.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";
import { message } from "../../models/message";
import { ChatsService } from "../../servicos/chats.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat: any;
  // public message: message;

  public mensajes = [ ];

  public room: any;

  public msg : string;
  

  constructor( 
    private navparams: NavParams, 
    private modal: ModalController,
    private chatService:ChatsService) { }

  ngOnInit() {

    this.chatService.getChatRoom(this.chat.id).subscribe( room =>{
      console.log(room);
      this.room = room;
    })

    this.chat = this.navparams.get('chat')
  }

  closeChat(){
    this.modal.dismiss()
  }

  // METODO PARA ENVIAR MENSAGEM
  // PUSH ITS LIKE COLOCAR ALGO DENTRO DE UM RECIPIENTE.
  sendMessage(){

    const mensagem: message = {
      content : this.msg,
      type : 'text',
      date : new Date()
    }
   
    this.chatService.sendMsgToFirebase(mensagem, this.chat.id);
    this.msg = "";
  }

}
