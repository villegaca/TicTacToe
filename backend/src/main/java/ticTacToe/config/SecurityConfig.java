package ticTacToe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

        private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;

        @Bean
        public SecurityFilterChain fitlerChain(HttpSecurity http) throws Exception {
            http
                    .exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)
                    .and()
                    .csrf().disable()
                    .sessionManagement(null).sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .authorizeHttpRequests((requests) -> requests   
                        .requestMatchers(HttpMethod.POST, "/login", "/register").permitAll()
                        .anyRequest().authenticated()
                    );
            return http.build();

        }
}
