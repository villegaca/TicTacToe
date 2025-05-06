package ticTacToe.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().directory("backend").filename(".env").load();
		System.setProperty("MONGO_URI", dotenv.get("MONGO_URI"));
		System.setProperty("DATABASE_NAME", dotenv.get("DATABASE_NAME"));
		System.setProperty("SECURITY_USERNAME", dotenv.get("SECURITY_USERNAME"));
		System.setProperty("SECURITY_PASSWORD", dotenv.get("SECURITY_PASSWORD"));
		SpringApplication.run(BackendApplication.class, args);
	}

}
