import { Controller, Get, Redirect } from "@nestjs/common";

@Controller('')
export class RootController {
    @Get()
    @Redirect("/swagger-ui")
    redirectToSwagger() { }
}