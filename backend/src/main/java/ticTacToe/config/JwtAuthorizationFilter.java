package ticTacToe.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter{

    //private UserAuthProvider userAuthProvider;
    private JwtTokenUtil tokenUtil;
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    public JwtAuthorizationFilter(JwtTokenUtil tokenUtil, CustomUserDetailsService customUserDetailsService){
        this.tokenUtil = tokenUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal (HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain filterChain) throws ServletException, IOException {
        
        String token = getJWTFromRequest(request);
        String header= request.getHeader(HttpHeaders.AUTHORIZATION);
        
        if(StringUtils.hasText(token) && tokenUtil.validateToken(token)){
            String userName = tokenUtil.getUserNameFromJWT(token);

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        // if(header != null){
        //     String[] elements = header.split(" ");

        //     if (elements.length ==2 && "Bearer".equals(elements[0])){
        //         try {
        //             SecurityContextHolder.getContext().setAuthentication(
        //                 tokenUtil.validateToken(elements[1])
        //             );
        //         } catch (RunTimeException e){
        //             SecurityContextHolder.clearContext();
        //             throw e;
        //         } 
        //     }
        // }
        filterChain.doFilter(request, response);

    }

    private String getJWTFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
    
    
}
