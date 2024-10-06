import {test, expect, describe} from "bun:test";
import {Protocol, UrlBuilder} from "~/utils/UrlBuilder";

describe("URL Builder Tests", () => {
    test("API base URL", () => {
        import.meta.env.VITE_API_URL = "http://localhost:300"
        expect(import.meta.env.VITE_API_URL).toBe("http://localhost:300")
        expect(new UrlBuilder().setPathname("/").build()).toBe("http://localhost:300/")
    })

    test("Custom base URL", () => {
        expect(new UrlBuilder("http://google.com").setPathname("/").build()).toBe("http://google.com/")
    })
})

describe("URL Builder with Parameters", () => {
    test("With search parameters", () => {
        expect(new UrlBuilder("http://google.com").addSearchParams("q", "test").build())
            .toBe("http://google.com/?q=test")
    })

    test("With HTTPS protocol", () => {
        expect(new UrlBuilder("http://google.com").setProtocol(Protocol.HTTPS).build()).toBe("https://google.com/")
    })

    test("With port", () => {
        expect(new UrlBuilder("http://google.com").setPort("3000").build()).toBe("http://google.com:3000/")
    })

    test("With full configuration", () => {
        expect(
            new UrlBuilder("http://google.com")
                .setPort("3000")
                .setProtocol(Protocol.HTTPS)
                .addSearchParams("q", "test")
                .setPathname("/")
                .build()
        ).toBe("https://google.com:3000/?q=test")
    })
})
