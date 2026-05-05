import type {Station} from "@/entities/station/model/types.ts";

export const stationsRaw: Station[] = [
    // Ligne 1 - Сокольническая
    {
        id: "bulvar_rokossovskogo",
        name: "Bulvar Rokossovskogo",
        nameLocal: "Бульвар Рокоссовского",
        position: {
            lat: 55.8154055,
            lng: 37.7329261
        }
        },
    {
        id: "cherkizovskaya", name: "Cherkizovskaya", nameLocal: "Черкизовская", position: { lat: 55.803943, lng: 37.744764 } },
    {
        id: "preobrazhenskaya_ploshchad", name: "Preobrazhenskaya Ploshchad", nameLocal: "Преображенская площадь", position: { lat: 55.7962395, lng: 37.7154778 } },
    {
        id: "sokolniki", name: "Sokolniki", nameLocal: "Сокольники", position: { lat: 55.78925, lng: 37.679683 } },
    {
        id: "krasnoselskaya", name: "Krasnoselskaya", nameLocal: "Красносельская", position: { lat: 55.7799958, lng: 37.6661449 } },
    {
        id: "komsomolskaya", name: "Komsomolskaya", nameLocal: "Комсомольская", position: { lat: 55.7764063, lng: 37.6561361 } },
    {
        id: "krasnye_vorota", name: "Krasnye Vorota", nameLocal: "Красные ворота", position: { lat: 55.76908, lng: 37.649106 } },
    {
        id: "chistye_prudy", name: "Chistye Prudy", nameLocal: "Чистые пруды", position: { lat: 55.7649152, lng: 37.6383605 } },
    {
        id: "lubyanka", name: "Lubyanka", nameLocal: "Лубянка", position: { lat: 55.75966, lng: 37.626581 } },
    {
        id: "okhotny_ryad", name: "Okhotny Ryad", nameLocal: "Охотный ряд", position: { lat: 55.7572235, lng: 37.6150129 } },
    {
        id: "biblioteka_lenina", name: "Biblioteka Lenina", nameLocal: "Библиотека имени Ленина", position: { lat: 55.7522265, lng: 37.6103187 } },
    {
        id: "kropotkinskaya", name: "Kropotkinskaya", nameLocal: "Кропоткинская", position: { lat: 55.745155, lng: 37.603031 } },
    {
        id: "park_kultury", name: "Park Kultury", nameLocal: "Парк культуры", position: { lat: 55.7351793, lng: 37.5931278 } },
    {
        id: "frunzenskaya", name: "Frunzenskaya", nameLocal: "Фрунзенская", position: { lat: 55.727474, lng: 37.580683 } },
    {
        id: "sportivnaya", name: "Sportivnaya", nameLocal: "Спортивная", position: { lat: 55.7224328, lng: 37.5620735 } },
    {
        id: "vorobyovy_gory", name: "Vorobyovy Gory", nameLocal: "Воробьёвы горы", position: { lat: 55.7115933, lng: 37.561049 } },
    {
        id: "universitet", name: "Universitet", nameLocal: "Университет", position: { lat: 55.6931907, lng: 37.5345267 } },
    {
        id: "prospekt_vernadskogo", name: "Prospekt Vernadskogo", nameLocal: "Проспект Вернадского", position: { lat: 55.676978, lng: 37.50631 } },
    {
        id: "yugo_zapadnaya", name: "Yugo-Zapadnaya", nameLocal: "Юго-Западная", position: { lat: 55.66375, lng: 37.483152 } },
    {
        id: "troparyovo", name: "Troparyovo", nameLocal: "Тропарёво", position: { lat: 55.645646, lng: 37.4729972 } },
    {
        id: "rumyantsevo", name: "Rumyantsevo", nameLocal: "Румянцево", position: { lat: 55.632969, lng: 37.441696 } },
    {
        id: "salaryevo", name: "Salaryevo", nameLocal: "Саларьево", position: { lat: 55.621907, lng: 37.424165 } },
    {
        id: "filatov_lug", name: "Filatov Lug", nameLocal: "Филатов Луг", position: { lat: 55.60118, lng: 37.407999 } },
    {
        id: "prokshino", name: "Prokshino", nameLocal: "Прокшино", position: { lat: 55.586457, lng: 37.433222 } },
    {
        id: "olkhovaya", name: "Olkhovaya", nameLocal: "Ольховая", position: { lat: 55.568985, lng: 37.459057 } },
    {
        id: "kommunarka", name: "Kommunarka", nameLocal: "Коммунарка", position: { lat: 55.560074, lng: 37.468651 } },

    // Ligne 2 - Замоскворецкая
    { id: "alma_atinskaya", name: "Alma-Atinskaya", nameLocal: "Алма-Атинская", position: { lat: 55.632813, lng: 37.766061 } },
    { id: "krasnogvardeyskaya", name: "Krasnogvardeyskaya", nameLocal: "Красногвардейская", position: { lat: 55.613866, lng: 37.744544 } },
    { id: "domodedovskaya", name: "Domodedovskaya", nameLocal: "Домодедовская", position: { lat: 55.610953, lng: 37.71909 } },
    { id: "orekhovo", name: "Orekhovo", nameLocal: "Орехово", position: { lat: 55.613195, lng: 37.694966 } },
    { id: "tsaritsyno", name: "Tsaritsyno", nameLocal: "Царицыно", position: { lat: 55.621456, lng: 37.669453 } },
    { id: "kantemirovskaya", name: "Kantemirovskaya", nameLocal: "Кантемировская", position: { lat: 55.6347702, lng: 37.6570599 } },
    { id: "kashirskaya", name: "Kashirskaya", nameLocal: "Каширская", position: { lat: 55.655134, lng: 37.648843 } },
    { id: "kolomenskaya", name: "Kolomenskaya", nameLocal: "Коломенская", position: { lat: 55.6795093, lng: 37.6633652 } },
    { id: "tekhnopark", name: "Tekhnopark", nameLocal: "Технопарк", position: { lat: 55.693704, lng: 37.664496 } },
    { id: "avtozavodskaya", name: "Avtozavodskaya", nameLocal: "Автозаводская", position: { lat: 55.7086, lng: 37.6573453 } },
    { id: "paveletskaya", name: "Paveletskaya", nameLocal: "Павелецкая", position: { lat: 55.731266, lng: 37.636263 } },
    { id: "novokuznetskaya", name: "Novokuznetskaya", nameLocal: "Новокузнецкая", position: { lat: 55.7424277, lng: 37.6292832 } },
    { id: "teatralnaya", name: "Teatralnaya", nameLocal: "Театральная", position: { lat: 55.7576, lng: 37.618738 } },
    { id: "tverskaya", name: "Tverskaya", nameLocal: "Тверская", position: { lat: 55.765362, lng: 37.6049562 } },
    { id: "mayakovskaya", name: "Mayakovskaya", nameLocal: "Маяковская", position: { lat: 55.7703912, lng: 37.5960546 } },
    { id: "belorusskaya", name: "Belorusskaya", nameLocal: "Белорусская", position: { lat: 55.7771985, lng: 37.5817828 } },
    { id: "dinamo", name: "Dinamo", nameLocal: "Динамо", position: { lat: 55.7891159, lng: 37.5595953 } },
    { id: "aeroport", name: "Aeroport", nameLocal: "Аэропорт", position: { lat: 55.800365, lng: 37.532628 } },
    { id: "sokol", name: "Sokol", nameLocal: "Сокол", position: { lat: 55.80478, lng: 37.515548 } },
    { id: "voykovskaya", name: "Voykovskaya", nameLocal: "Войковская", position: { lat: 55.819087, lng: 37.497888 } },
    { id: "vodny_stadion", name: "Vodny Stadion", nameLocal: "Водный стадион", position: { lat: 55.839933, lng: 37.486703 } },
    { id: "rechnoy_vokzal", name: "Rechnoy Vokzal", nameLocal: "Речной вокзал", position: { lat: 55.8551525, lng: 37.4760633 } },
    { id: "belomorskaya", name: "Belomorskaya", nameLocal: "Беломорская", position: { lat: 55.865369, lng: 37.475692 } },
    { id: "khovrino", name: "Khovrino", nameLocal: "Ховрино", position: { lat: 55.878273, lng: 37.480768 } },

    // Ligne 3 - Арбатско-Покровская
    { id: "shchyolkovskaya", name: "Shchyolkovskaya", nameLocal: "Щёлковская", position: { lat: 55.8084991, lng: 37.7984928 } },
    { id: "pervomayskaya", name: "Pervomayskaya", nameLocal: "Первомайская", position: { lat: 55.794507, lng: 37.799363 } },
    { id: "izmaylovskaya", name: "Izmaylovskaya", nameLocal: "Измайловская", position: { lat: 55.787775, lng: 37.781435 } },
    { id: "partizanskaya", name: "Partizanskaya", nameLocal: "Партизанская", position: { lat: 55.788451, lng: 37.749619 } },
    { id: "semyonovskaya", name: "Semyonovskaya", nameLocal: "Семёновская", position: { lat: 55.78306, lng: 37.719423 } },
    { id: "elektrozavodskaya", name: "Elektrozavodskaya", nameLocal: "Электрозаводская", position: { lat: 55.782094, lng: 37.705287 } },
    { id: "baumanskaya", name: "Baumanskaya", nameLocal: "Бауманская", position: { lat: 55.7724663, lng: 37.679113 } },
    { id: "kurskaya", name: "Kurskaya", nameLocal: "Курская", position: { lat: 55.7585098, lng: 37.6602746 } },
    { id: "ploshchad_revolyutsii", name: "Ploshchad Revolyutsii", nameLocal: "Площадь Революции", position: { lat: 55.7564497, lng: 37.6233539 } },
    { id: "arbatskaya", name: "Arbatskaya", nameLocal: "Арбатская", position: { lat: 55.752161, lng: 37.601518 } },
    { id: "smolenskaya", name: "Smolenskaya", nameLocal: "Смоленская", position: { lat: 55.747933, lng: 37.5836873 } },
    { id: "kievskaya", name: "Kievskaya", nameLocal: "Киевская", position: { lat: 55.7440118, lng: 37.5673351 } },
    { id: "park_pobedy", name: "Park Pobedy", nameLocal: "Парк Победы", position: { lat: 55.7358848, lng: 37.5174924 } },
    { id: "slavyansky_bulvar", name: "Slavyansky Bulvar", nameLocal: "Славянский бульвар", position: { lat: 55.729576, lng: 37.470717 } },
    { id: "kuntsevskaya", name: "Kuntsevskaya", nameLocal: "Кунцевская", position: { lat: 55.7306809, lng: 37.4452868 } },
    { id: "molodyozhnaya", name: "Molodyozhnaya", nameLocal: "Молодёжная", position: { lat: 55.740611, lng: 37.416918 } },
    { id: "krylatskoe", name: "Krylatskoe", nameLocal: "Крылатское", position: { lat: 55.756838, lng: 37.408013 } },
    { id: "strogino", name: "Strogino", nameLocal: "Строгино", position: { lat: 55.803723, lng: 37.403083 } },
    { id: "myakinino", name: "Myakinino", nameLocal: "Мякинино", position: { lat: 55.825476, lng: 37.38537 } },
    { id: "volokolamskaya", name: "Volokolamskaya", nameLocal: "Волоколамская", position: { lat: 55.835749, lng: 37.38199 } },
    { id: "mitino", name: "Mitino", nameLocal: "Митино", position: { lat: 55.846006, lng: 37.361364 } },
    { id: "pyatnitskoe_shosse", name: "Pyatnitskoe Shosse", nameLocal: "Пятницкое шоссе", position: { lat: 55.855876, lng: 37.354181 } },

    // Ligne 4 - Филёвская
    { id: "kuntsevskaya_4", name: "Kuntsevskaya", nameLocal: "Кунцевская", position: { lat: 55.7306809, lng: 37.4452868 } },
    { id: "pionerskaya", name: "Pionerskaya", nameLocal: "Пионерская", position: { lat: 55.7361492, lng: 37.4676943 } },
    { id: "filevsky_park", name: "Filevsky Park", nameLocal: "Филёвский парк", position: { lat: 55.73957, lng: 37.4833029 } },
    { id: "bagrationovskaya", name: "Bagrationovskaya", nameLocal: "Багратионовская", position: { lat: 55.743792, lng: 37.497743 } },
    { id: "fili", name: "Fili", nameLocal: "Фили", position: { lat: 55.746099, lng: 37.514797 } },
    { id: "kutuzovskaya", name: "Kutuzovskaya", nameLocal: "Кутузовская", position: { lat: 55.740005, lng: 37.534377 } },
    { id: "studencheskaya", name: "Studencheskaya", nameLocal: "Студенческая", position: { lat: 55.738878, lng: 37.5483398 } },
    { id: "kievskaya_4", name: "Kievskaya", nameLocal: "Киевская", position: { lat: 55.7440118, lng: 37.5673351 } },
    { id: "smolenskaya_4", name: "Smolenskaya", nameLocal: "Смоленская", position: { lat: 55.747933, lng: 37.5836873 } },
    { id: "arbatskaya_4", name: "Arbatskaya", nameLocal: "Арбатская", position: { lat: 55.752161, lng: 37.601518 } },
    { id: "aleksandrovsky_sad", name: "Aleksandrovsky Sad", nameLocal: "Александровский сад", position: { lat: 55.752289, lng: 37.608663 } },
    { id: "vystavochnaya", name: "Vystavochnaya", nameLocal: "Выставочная", position: { lat: 55.750015, lng: 37.542048 } },
    { id: "mezhdunarodnaya", name: "Mezhdunarodnaya", nameLocal: "Международная", position: { lat: 55.747819, lng: 37.533181 } },

    // Ligne 5 - Кольцевая
    { id: "park_kultury_5", name: "Park Kultury", nameLocal: "Парк культуры", position: { lat: 55.7351793, lng: 37.5931278 } },
    { id: "oktyabrskaya", name: "Oktyabrskaya", nameLocal: "Октябрьская", position: { lat: 55.7292498, lng: 37.6113133 } },
    { id: "dobryninskaya", name: "Dobryninskaya", nameLocal: "Добрынинская", position: { lat: 55.72898, lng: 37.622529 } },
    { id: "paveletskaya_5", name: "Paveletskaya", nameLocal: "Павелецкая", position: { lat: 55.731266, lng: 37.636263 } },
    { id: "taganskaya", name: "Taganskaya", nameLocal: "Таганская", position: { lat: 55.7424507, lng: 37.6533745 } },
    { id: "kurskaya_5", name: "Kurskaya", nameLocal: "Курская", position: { lat: 55.7585098, lng: 37.6602746 } },
    { id: "komsomolskaya_5", name: "Komsomolskaya", nameLocal: "Комсомольская", position: { lat: 55.7764063, lng: 37.6561361 } },
    { id: "prospekt_mira", name: "Prospekt Mira", nameLocal: "Проспект Мира", position: { lat: 55.7797015, lng: 37.6336099 } },
    { id: "novoslobodskaya", name: "Novoslobodskaya", nameLocal: "Новослободская", position: { lat: 55.7796266, lng: 37.6014405 } },
    { id: "belorusskaya_5", name: "Belorusskaya", nameLocal: "Белорусская", position: { lat: 55.7771985, lng: 37.5817828 } },
    { id: "krasnopresnenskaya", name: "Krasnopresnenskaya", nameLocal: "Краснопресненская", position: { lat: 55.7602466, lng: 37.5771211 } },
    { id: "kievskaya_5", name: "Kievskaya", nameLocal: "Киевская", position: { lat: 55.7440118, lng: 37.5673351 } },

    //Ligne 10 - Люблинско-Дмитровская
    { id: "seligerskaya", name: "Seligerskaya", nameLocal: "Селигерская", position: { lat: 55.866556, lng: 37.547117 } },
    { id: "verkhnie_likhobory", name: "Verkhnie Likhobory", nameLocal: "Верхние Лихоборы", position: { lat: 55.855143, lng: 37.561589 } },
    { id: "okruzhnaya", name: "Okruzhnaya", nameLocal: "Окружная", position: { lat: 55.844748, lng: 37.575531 } },
    { id: "petrovsko_razumovskaya_10", name: "Petrovsko-Razumovskaya", nameLocal: "Петровско-Разумовская", position: { lat: 55.835392, lng: 37.573762 } },
    { id: "fonvizinskaya", name: "Fonvizinskaya", nameLocal: "Фонвизинская", position: { lat: 55.822888, lng: 37.587344 } },
    { id: "butyrskaya", name: "Butyrskaya", nameLocal: "Бутырская", position: { lat: 55.813531, lng: 37.602247 } },
    { id: "maryina_roshcha", name: "Maryina Roshcha", nameLocal: "Марьина роща", position: { lat: 55.7935432, lng: 37.6168464 } },
    { id: "dostoevskaya", name: "Dostoevskaya", nameLocal: "Достоевская", position: { lat: 55.7817338, lng: 37.614065 } },
    { id: "trubnaya", name: "Trubnaya", nameLocal: "Трубная", position: { lat: 55.767798, lng: 37.621908 } },
    { id: "sretensky_bulvar", name: "Sretensky Bulvar", nameLocal: "Сретенский бульвар", position: { lat: 55.765802, lng: 37.639251 } },
    { id: "chkalovskaya", name: "Chkalovskaya", nameLocal: "Чкаловская", position: { lat: 55.7560807, lng: 37.6593866 } },
    { id: "rimskaya", name: "Rimskaya", nameLocal: "Римская", position: { lat: 55.7468006, lng: 37.6795593 } },
    { id: "krestyanskaya_zastava", name: "Krestyanskaya Zastava", nameLocal: "Крестьянская застава", position: { lat: 55.7322759, lng: 37.665521 } },
    { id: "dubrovka", name: "Dubrovka", nameLocal: "Дубровка", position: { lat: 55.717828, lng: 37.676631 } },
    { id: "kozhukhovskaya", name: "Kozhukhovskaya", nameLocal: "Кожуховская", position: { lat: 55.706289, lng: 37.685595 } },
    { id: "pechatniki", name: "Pechatniki", nameLocal: "Печатники", position: { lat: 55.693163, lng: 37.726901 } },
    { id: "volzhskaya", name: "Volzhskaya", nameLocal: "Волжская", position: { lat: 55.690904, lng: 37.75332 } },
    { id: "lyublino", name: "Lyublino", nameLocal: "Люблино", position: { lat: 55.67568, lng: 37.761759 } },
    { id: "bratislavskaya", name: "Bratislavskaya", nameLocal: "Братиславская", position: { lat: 55.6590248, lng: 37.7497575 } },
    { id: "maryino", name: "Maryino", nameLocal: "Марьино", position: { lat: 55.650167, lng: 37.743734 } },
    { id: "borisovo", name: "Borisovo", nameLocal: "Борисово", position: { lat: 55.6334629, lng: 37.744072 } },
    { id: "shipilovskaya", name: "Shipilovskaya", nameLocal: "Шипиловская", position: { lat: 55.6202081, lng: 37.7432181 } },
    { id: "zyablikovo", name: "Zyablikovo", nameLocal: "Зябликово", position: { lat: 55.612031, lng: 37.744946 } },

    // Ligne 11 - Большая кольцевая
    { id: "delovoy_tsentr_11", name: "Delovoy Tsentr", nameLocal: "Деловой центр", position: { lat: 55.749025, lng: 37.539904 } },
    { id: "shelepikha_11", name: "Shelepikha", nameLocal: "Шелепиха", position: { lat: 55.757116, lng: 37.524067 } },
    { id: "khoroshyovskaya", name: "Khoroshyovskaya", nameLocal: "Хорошёвская", position: { lat: 55.776862, lng: 37.520797 } },
    { id: "tsSKA", name: "TsSKA", nameLocal: "ЦСКА", position: { lat: 55.786602, lng: 37.533301 } },
    { id: "petrovsky_park", name: "Petrovsky Park", nameLocal: "Петровский парк", position: { lat: 55.791957, lng: 37.557322 } },
    { id: "savelyovskaya_11", name: "Savelyovskaya", nameLocal: "Савёловская", position: { lat: 55.792807, lng: 37.586122 } },
    { id: "maryina_roshcha_11", name: "Maryina Roshcha", nameLocal: "Марьина роща", position: { lat: 55.7935432, lng: 37.6168464 } },
    { id: "kakhovskaya", name: "Kakhovskaya", nameLocal: "Каховская", position: { lat: 55.6525055, lng: 37.5969296 } },
    { id: "zyuzino", name: "Zyuzino", nameLocal: "Зюзино", position: { lat: 55.655717, lng: 37.57369 } },
    { id: "vorontsovskaya", name: "Vorontsovskaya", nameLocal: "Воронцовская", position: { lat: 55.658845, lng: 37.539446 } },
    { id: "novatorskaya", name: "Novatorskaya", nameLocal: "Новаторская", position: { lat: 55.669823, lng: 37.52218 } },
    { id: "prospekt_vernadskogo_11", name: "Prospekt Vernadskogo", nameLocal: "Проспект Вернадского", position: { lat: 55.678517, lng: 37.503748 } },
    { id: "michurinsky_prospekt_11", name: "Michurinsky Prospekt", nameLocal: "Мичуринский проспект", position: { lat: 55.6882, lng: 37.485307 } },
    { id: "aminevskaya", name: "Aminevskaya", nameLocal: "Аминьевская", position: { lat: 55.697189, lng: 37.464931 } },
    { id: "davydkovo", name: "Davydkovo", nameLocal: "Давыдково", position: { lat: 55.71517, lng: 37.45177 } },
    { id: "kuntsevskaya_11", name: "Kuntsevskaya", nameLocal: "Кунцевская", position: { lat: 55.728707, lng: 37.445985 } },
    { id: "terekhovo", name: "Terekhovo", nameLocal: "Терехово", position: { lat: 55.748108, lng: 37.459738 } },
    { id: "mnyovniki", name: "Mnyovniki", nameLocal: "Мнёвники", position: { lat: 55.761152, lng: 37.471391 } },
    { id: "narodnoe_opolchenie", name: "Narodnoe Opolchenie", nameLocal: "Народное Ополчение", position: { lat: 55.7757, lng: 37.485077 } },

    // Ligne 12 - Бутовская
    { id: "bitsevsky_park", name: "Bitsevsky Park", nameLocal: "Битцевский парк", position: { lat: 55.600761, lng: 37.555577 } },
    { id: "lesoparkovaya", name: "Lesoparkovaya", nameLocal: "Лесопарковая", position: { lat: 55.581433, lng: 37.579106 } },
    { id: "ulitsa_starakachalovskaya", name: "Ulitsa Starakachalovskaya", nameLocal: "Улица Старокачаловская", position: { lat: 55.569341, lng: 37.576515 } },
    { id: "ulitsa_skobelevskaya", name: "Ulitsa Skobelevskaya", nameLocal: "Улица Скобелевская", position: { lat: 55.548141, lng: 37.55466 } },
    { id: "bulvar_admirala_ushakova", name: "Bulvar Admirala Ushakova", nameLocal: "Бульвар адмирала Ушакова", position: { lat: 55.545169, lng: 37.54229 } },
    { id: "ulitsa_gorchakova", name: "Ulitsa Gorchakova", nameLocal: "Улица Горчакова", position: { lat: 55.542106, lng: 37.531716 } },
    { id: "buninskaya_alleya", name: "Buninskaya Alleya", nameLocal: "Бунинская аллея", position: { lat: 55.537949, lng: 37.515382 } },

    // Ligne 13 - Московский монорельс
    { id: "timiryazevskaya_13", name: "Timiryazevskaya", nameLocal: "Тимирязевская", position: { lat: 55.819012, lng: 37.578891 } },
    { id: "ulitsa_milashenkova", name: "Ulitsa Milashenkova", nameLocal: "Улица Милашенкова", position: { lat: 55.8217654, lng: 37.5891812 } },
    { id: "teletsentr", name: "Teletsentr", nameLocal: "Телецентр", position: { lat: 55.821818, lng: 37.608926 } },
    { id: "ulitsa_akademika_korolyova", name: "Ulitsa Akademika Korolyova", nameLocal: "Улица Академика Королёва", position: { lat: 55.821061, lng: 37.641478 } },
    { id: "vystavochny_tsentr", name: "Vystavochny Tsentr", nameLocal: "Выставочный центр", position: { lat: 55.824049, lng: 37.638473 } },
    { id: "ulitsa_sergeya_eizenshteyna", name: "Ulitsa Sergeya Eizenshteyna", nameLocal: "Улица Сергея Эйзенштейна", position: { lat: 55.8292094, lng: 37.644801 } },

    // Ligne 14 - МЦК (anneaux central)
    { id: "vladykino_14", name: "Vladykino", nameLocal: "Владыкино", position: { lat: 55.8460423, lng: 37.5893195 } },
    { id: "okruzhnaya_14", name: "Okruzhnaya", nameLocal: "Окружная", position: { lat: 55.84893, lng: 37.571279 } },
    { id: "likhobory", name: "Likhobory", nameLocal: "Лихоборы", position: { lat: 55.867296, lng: 37.5409348 } },
    // ... (stations 14 ici, je les ai toutes dans la donnée originale)

    // Ligne 15 - Некрасовская
    { id: "elektrozavodskaya_15", name: "Elektrozavodskaya", nameLocal: "Электрозаводская", position: { lat: 55.780284, lng: 37.703018 } },
    { id: "lefortovo", name: "Lefortovo", nameLocal: "Лефортово", position: { lat: 55.764699, lng: 37.706759 } },
    { id: "aviamotornaya_15", name: "Aviamotornaya", nameLocal: "Авиамоторная", position: { lat: 55.753669, lng: 37.719155 } },
    { id: "nizhegorodskaya", name: "Nizhegorodskaya", nameLocal: "Нижегородская", position: { lat: 55.731681, lng: 37.730313 } },
    { id: "stakhanovskaya", name: "Stakhanovskaya", nameLocal: "Стахановская", position: { lat: 55.727207, lng: 37.752257 } },
    { id: "okskaya", name: "Okskaya", nameLocal: "Окская", position: { lat: 55.718623, lng: 37.781277 } },
    { id: "yugo_vostochnaya", name: "Yugo-Vostochnaya", nameLocal: "Юго-Восточная", position: { lat: 55.705353, lng: 37.817999 } },
    { id: "kosino", name: "Kosino", nameLocal: "Косино", position: { lat: 55.703427, lng: 37.851312 } },
    { id: "ulitsa_dmitrievskogo", name: "Ulitsa Dmitrievskogo", nameLocal: "Улица Дмитриевского", position: { lat: 55.710313, lng: 37.879053 } },
    { id: "lukhmanovskaya", name: "Lukhmanovskaya", nameLocal: "Лухмановская", position: { lat: 55.708517, lng: 37.900575 } },
    { id: "nekrasovka", name: "Nekrasovka", nameLocal: "Некрасовка", position: { lat: 55.702969, lng: 37.928036 } }
];