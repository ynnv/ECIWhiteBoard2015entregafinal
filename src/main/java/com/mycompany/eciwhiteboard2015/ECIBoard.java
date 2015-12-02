/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.eciwhiteboard2015;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author PAOLA
 */
@ServerEndpoint("/ECIBoardendpoint")
public class ECIBoard {
private static Set<Session> usuarios = Collections.synchronizedSet(new HashSet<Session>());
    
    @OnMessage
    public void onMessage(String message, Session usuario) throws IOException {
        System.out.println("Mensaje: " + message);

        for (Session u : usuarios) {
            if (u != usuario) {
                u.getBasicRemote().sendText(message);
            }
        }
    }

    @OnOpen
    public void onOpen(Session usuario) {
        usuarios.add(usuario);
    }

    @OnClose
    public void onClose(Session usuario) {
        usuarios.remove(usuario);        
    }

    
}
