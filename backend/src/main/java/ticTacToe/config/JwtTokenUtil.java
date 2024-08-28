package ticTacToe.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;

public class JwtTokenUtil {
    private final String secretKey = "helloWorld";

    public String generateToken(String userName){
        Date dateNow = new Date();
        Date expiredDate = new Date(dateNow.getTime() + SecurityConstants.EXPIRATION_VALUE);

        String token = Jwts.builder()
            .setSubject(userName)
            .setIssuedAt(dateNow)
            .setExpiration(expiredDate)
            .signWith(SignatureAlgorithm.HS256, SecurityConstants.JWT_SECRET)
            .compact();
        
        return token; 
    }

    public String getUserNameFromJWT(String token){
        Claims claims = Jwts.parser()
            .setSigningKey(SecurityConstants.JWT_SECRET)
            .parseClaimsJws(token)
            .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try{
            Jwts.parser().setSigningKey(SecurityConstants.JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch (Exception e){
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
}
