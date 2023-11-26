import { db } from "$lib/database";
import { type RequestHandler, error, json, fail } from "@sveltejs/kit";

const przedmioty = {
    Potka: 500,
    Miecz: 1000,
    Złoto: 5000,
    Sakwwa: 100,
    Hełm: 300,
    Zbroja: 600,
    Kupon: 100,
    Moneta: 1,
    Komponent: 50,
    Różdża: 1200,
    Kapelusz: 200,
    Tarcza: 400,
    Niespodzianka: 150,
    Skarpetki: 250,
    Grzebień: 180,
    Dynia: 80,
    Kij: 350,
    Klepsydra: 700,
    Pizza: 420,
    Kanapka: 30,
    Pióro: 800,
    Kieliszek: 90,
    Kamera: 600,
    Melodia: 200,
    Smok: 2000,
    Skrzynia: 300,
    Lornetka: 180,
    Lampka: 120,
    Medalion: 480,
    Diament: 1500,
    Koparka: 1000,
    Czekolada: 70,
    Dzwonek: 50,
    Kostium: 350,
    Banana: 40,
    Kapcie: 120,
    Błazen: 300,
    Laptop: 800,
    Galaktyka: 50000,
    Skarpety: 60,
    Rewolwer: 800,
    Arbuz: 90,
    Kura: 200,
    Termos: 180,
    Misio: 100,
    Karafka: 250,
    Pingwin: 150,
    Kaktus: 30,
    Nocnik: 70,
    Wazon: 110,
    Maskotka: 120,
    Rakieta: 900,
    Kołdra: 200,
    Słomka: 10,
    Flet: 130,
    Krzesło: 80,
    Guma: 5,
    Kredki: 40,
    Deska: 300,
    Wiewiórka: 120,
    Pudełko: 150,
    Pianino: 1000,
    Miotełka: 70,
    Dinozaur: 250,
    Cukierek: 15,
    Gitara: 550,
    Słuchawki: 120,
    Klucz: 90
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) {
        throw error(403, { message: "Unauthorized" });
    }

    const user = await db.user.findUnique({
        where: {
            id: locals.user.id,
        }
    })
    if (!user) {
        throw error(403, { message: "user not found" })
    }
    let los = Math.floor(Math.random() * Object.keys(przedmioty).length);
    let nazwa_przedmiotu = Object.keys(przedmioty)[los];
    let wartosc_przedmitu = Object.values(przedmioty)[los];
    const data = await request.json();
    if (user.pieniadze < data.koszt) {
        console.log(user.pieniadze)
        return json({ zadluzony: true })
    }
    else {
        await db.user.update({
            where: {
                id: locals.user.id,
            },
            data: {
                pieniadze: locals.user.money - data.koszt
            }
        })
        await db.itemy.create({
            data: {
                nazwa: nazwa_przedmiotu,
                wartosc: wartosc_przedmitu,
                userId: locals.user.id
            }
        })
        console.log(user.pieniadze)

        return json({ nazwa: nazwa_przedmiotu, wartosc: wartosc_przedmitu, zadluzony: false });
    }

}