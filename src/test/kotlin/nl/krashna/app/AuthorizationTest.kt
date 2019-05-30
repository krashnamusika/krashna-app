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
class AuthorizationTest {
    @Autowired
    private lateinit var client: WebTestClient

    private var jwtHeader = ""

    @Test
    fun `accessing API endpoints as user with sufficient authorization`() {
        logIn("user@krashna.nl")
        client.get()
            .uri("/api/movements")
            .header("Authorization", jwtHeader)
            .exchange()
            .expectStatus().is2xxSuccessful
    }

    @Test
    fun `accessing API endpoints as user with insufficient authorization`() {
        logIn("user@krashna.nl")
        client.delete()
            .uri("/api/movements/1")
            .header("Authorization", jwtHeader)
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
