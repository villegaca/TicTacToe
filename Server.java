import java.io.*;
import java.net.*;

public class Server {
    private Socket socket = null;
    private ServerSocket server = null;

    String serverStart = "Server Started\nWaiting client\n";
    
    public Server(ServerSocket serverSocket){
        this.server = serverSocket;
    }

    public void startServer(ServerSocket serverSocket){
        while (!server.isClosed()){
            try{
                socket = server.accept();
                System.out.println("new client has connected");
                ClientHandler clientHandler = new ClientHandler(socket);
                clientHandler.start();
            } catch (IOException i){
                
            }
        }
    }
}
