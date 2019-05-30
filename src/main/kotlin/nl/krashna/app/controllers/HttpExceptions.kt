package nl.krashna.app.controllers

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
class DuplicateResourceException : RuntimeException()

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
class InvalidTokenException : RuntimeException()
