import java.io.*;
import java.net.*;

public class Server {
    private Socket socket = null;
    private ServerSocket server = null;

    String serverStart = "Server Started\nWaiting client\n";
    
    public Server(int port){
        try{
        server = new ServerSocket(port);
        System.out.println(serverStart);
        socket = server.accept();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
