package nl.krashna.app

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.reactive.server.WebTestClient
import java.util.function.Consumer

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthenticationTest {
    @Autowired
    private lateinit var client: WebTestClient

    private var jwtHeader = ""

    @Test
    fun `logging in successfully`() {
        client.post()
            .uri("/api/auth/login")
            .syncBody("""{"email": "admin@krashna.nl", "password": "pass"}""")
            .exchange()
            .expectStatus().is2xxSuccessful
            .expectHeader().value("Authorization") { jwt -> jwtHeader = jwt }
    }

    @Test
    fun `logging in with wrong password`() {
        client.post()
            .uri("/api/auth/login")
            .syncBody("""{"email": "admin@krashna.nl", "password": "wrongPass"}""")
            .exchange()
            .expectStatus().is4xxClientError
    }

    @Test
    fun `logging in with wrong email`() {
        client.post()
            .uri("/api/auth/login")
            .syncBody("""{"email": "not-existing@krashna.nl", "password": "pass"}""")
            .exchange()
            .expectStatus().is4xxClientError
    }

    @Test
    fun `accessing API endpoints with prior authentication`() {
        logIn()
        client.get()
            .uri("/api/concerts")
            .header("Authorization", jwtHeader)
            .exchange()
            .expectStatus().is2xxSuccessful
    }

    @Test
    fun `accessing API endpoints without being authenticated`() {
        client.post()
            .uri("/api/concerts")
            .exchange()
            .expectStatus().is4xxClientError
    }

    private fun logIn(email: String="admin@krashna.nl") = client.post()
        .uri("/api/auth/login")
        .syncBody("""{"email": "$email", "password": "pass"}""")
        .exchange()
        .expectStatus().is2xxSuccessful
        .expectHeader().value("Authorization") { jwt -> jwtHeader = jwt }
}
