import java.io.IOException;
import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {
    public static void main (String args[]){
        String welcomeMsg = "Welcom to Tic Tac Toe!";
        String chooseOpponent = "Please select an opponent. Enter the corresponding number.\n1. Player\n2. Computer\n";
        String wrongInput = "Not a valid input.  Please try again.\n" + chooseOpponent;
        int opponentChoice = 0;
        Scanner scanner = new Scanner(System.in);

        System.out.println(welcomeMsg); 
        System.out.println(chooseOpponent);

        //case handling for user input using a boolean that is set to true if there are no errors
        //if there is an error, the boolean value remains false
        //if input is valid, then we check to see if the input is 1 or 2
        boolean validInput = false;
        while (!validInput && opponentChoice != 1 && opponentChoice != 2){
            try{
                opponentChoice = scanner.nextInt();
                if (opponentChoice != 1 && opponentChoice != 2){
                    System.out.println(wrongInput);
                    scanner.next();
                } else {
                    validInput = true;
                }
                //System.out.println();
                
                //scanner.next();
                //validInput = true;
            } catch (InputMismatchException i){
                System.out.println(wrongInput);
                scanner.next();
            }
        } 

        switch (opponentChoice){
            case 1: 
                System.out.println("hello");
                break;
            case 2:
                System.out.println("hellohello");
                break;
            default:
                break;
        }  
    }
}