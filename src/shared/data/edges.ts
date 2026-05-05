import type {Edge} from "@/entities/station/model/types.ts";

export const edges: Edge[] = [
    // LIGNE 1 - trajets
    { from: "bulvar_rokossovskogo", to: "cherkizovskaya", time: 2, type: "ride" },
    { from: "cherkizovskaya", to: "preobrazhenskaya_ploshchad", time: 2, type: "ride" },
    { from: "preobrazhenskaya_ploshchad", to: "sokolniki", time: 2, type: "ride" },
    { from: "sokolniki", to: "krasnoselskaya", time: 2, type: "ride" },
    { from: "krasnoselskaya", to: "komsomolskaya", time: 2, type: "ride" },
    { from: "komsomolskaya", to: "krasnye_vorota", time: 2, type: "ride" },
    { from: "krasnye_vorota", to: "chistye_prudy", time: 2, type: "ride" },
    { from: "chistye_prudy", to: "lubyanka", time: 2, type: "ride" },
    { from: "lubyanka", to: "okhotny_ryad", time: 2, type: "ride" },
    { from: "okhotny_ryad", to: "biblioteka_lenina", time: 2, type: "ride" },
    { from: "biblioteka_lenina", to: "kropotkinskaya", time: 2, type: "ride" },
    { from: "kropotkinskaya", to: "park_kultury", time: 2, type: "ride" },
    { from: "park_kultury", to: "frunzenskaya", time: 2, type: "ride" },
    { from: "frunzenskaya", to: "sportivnaya", time: 2, type: "ride" },
    { from: "sportivnaya", to: "vorobyovy_gory", time: 2, type: "ride" },
    { from: "vorobyovy_gory", to: "universitet", time: 2, type: "ride" },
    { from: "universitet", to: "prospekt_vernadskogo", time: 2, type: "ride" },
    { from: "prospekt_vernadskogo", to: "yugo_zapadnaya", time: 2, type: "ride" },
    { from: "yugo_zapadnaya", to: "troparyovo", time: 2, type: "ride" },
    { from: "troparyovo", to: "rumyantsevo", time: 2, type: "ride" },
    { from: "rumyantsevo", to: "salaryevo", time: 2, type: "ride" },
    { from: "salaryevo", to: "filatov_lug", time: 2, type: "ride" },
    { from: "filatov_lug", to: "prokshino", time: 2, type: "ride" },
    { from: "prokshino", to: "olkhovaya", time: 2, type: "ride" },
    { from: "olkhovaya", to: "kommunarka", time: 2, type: "ride" },

    // LIGNE 2 - trajets
    { from: "khovrino", to: "belomorskaya", time: 2, type: "ride" },
    { from: "belomorskaya", to: "rechnoy_vokzal", time: 2, type: "ride" },
    { from: "rechnoy_vokzal", to: "vodny_stadion", time: 2, type: "ride" },
    { from: "vodny_stadion", to: "voykovskaya", time: 2, type: "ride" },
    { from: "voykovskaya", to: "sokol", time: 2, type: "ride" },
    { from: "sokol", to: "aeroport", time: 2, type: "ride" },
    { from: "aeroport", to: "dinamo", time: 2, type: "ride" },
    { from: "dinamo", to: "belorusskaya", time: 2, type: "ride" },
    { from: "belorusskaya", to: "mayakovskaya", time: 2, type: "ride" },
    { from: "mayakovskaya", to: "tverskaya", time: 2, type: "ride" },
    { from: "tverskaya", to: "teatralnaya", time: 2, type: "ride" },
    { from: "teatralnaya", to: "novokuznetskaya", time: 2, type: "ride" },
    { from: "novokuznetskaya", to: "paveletskaya", time: 2, type: "ride" },
    { from: "paveletskaya", to: "avtozavodskaya", time: 2, type: "ride" },
    { from: "avtozavodskaya", to: "tekhnopark", time: 2, type: "ride" },
    { from: "tekhnopark", to: "kolomenskaya", time: 2, type: "ride" },
    { from: "kolomenskaya", to: "kashirskaya", time: 2, type: "ride" },
    { from: "kashirskaya", to: "kantemirovskaya", time: 2, type: "ride" },
    { from: "kantemirovskaya", to: "tsaritsyno", time: 2, type: "ride" },
    { from: "tsaritsyno", to: "orekhovo", time: 2, type: "ride" },
    { from: "orekhovo", to: "domodedovskaya", time: 2, type: "ride" },
    { from: "domodedovskaya", to: "krasnogvardeyskaya", time: 2, type: "ride" },
    { from: "krasnogvardeyskaya", to: "alma_atinskaya", time: 2, type: "ride" },

    // LIGNE 3 - trajets
    { from: "pyatnitskoe_shosse", to: "mitino", time: 2, type: "ride" },
    { from: "mitino", to: "volokolamskaya", time: 2, type: "ride" },
    { from: "volokolamskaya", to: "myakinino", time: 2, type: "ride" },
    { from: "myakinino", to: "strogino", time: 2, type: "ride" },
    { from: "strogino", to: "krylatskoe", time: 2, type: "ride" },
    { from: "krylatskoe", to: "molodyozhnaya", time: 2, type: "ride" },
    { from: "molodyozhnaya", to: "kuntsevskaya", time: 2, type: "ride" },
    { from: "kuntsevskaya", to: "slavyansky_bulvar", time: 2, type: "ride" },
    { from: "slavyansky_bulvar", to: "park_pobedy", time: 2, type: "ride" },
    { from: "park_pobedy", to: "kievskaya", time: 2, type: "ride" },
    { from: "kievskaya", to: "smolenskaya", time: 2, type: "ride" },
    { from: "smolenskaya", to: "arbatskaya", time: 2, type: "ride" },
    { from: "arbatskaya", to: "ploshchad_revolyutsii", time: 2, type: "ride" },
    { from: "ploshchad_revolyutsii", to: "kurskaya", time: 2, type: "ride" },
    { from: "kurskaya", to: "baumanskaya", time: 2, type: "ride" },
    { from: "baumanskaya", to: "elektrozavodskaya", time: 2, type: "ride" },
    { from: "elektrozavodskaya", to: "semyonovskaya", time: 2, type: "ride" },
    { from: "semyonovskaya", to: "partizanskaya", time: 2, type: "ride" },
    { from: "partizanskaya", to: "izmaylovskaya", time: 2, type: "ride" },
    { from: "izmaylovskaya", to: "pervomayskaya", time: 2, type: "ride" },
    { from: "pervomayskaya", to: "shchyolkovskaya", time: 2, type: "ride" },

    // LIGNE 4 - trajets
    { from: "mezhdunarodnaya", to: "vystavochnaya", time: 2, type: "ride" },
    { from: "vystavochnaya", to: "kievskaya_4", time: 2, type: "ride" },
    { from: "kievskaya_4", to: "studencheskaya", time: 2, type: "ride" },
    { from: "studencheskaya", to: "kutuzovskaya", time: 2, type: "ride" },
    { from: "kutuzovskaya", to: "fili", time: 2, type: "ride" },
    { from: "fili", to: "bagrationovskaya", time: 2, type: "ride" },
    { from: "bagrationovskaya", to: "filevsky_park", time: 2, type: "ride" },
    { from: "filevsky_park", to: "pionerskaya", time: 2, type: "ride" },
    { from: "pionerskaya", to: "kuntsevskaya_4", time: 2, type: "ride" },
    { from: "aleksandrovsky_sad", to: "arbatskaya_4", time: 2, type: "ride" },
    { from: "arbatskaya_4", to: "smolenskaya_4", time: 2, type: "ride" },
    { from: "smolenskaya_4", to: "kievskaya_4", time: 2, type: "ride" },

    // LIGNE 5 - trajets (circulaire - dans les deux sens)
    { from: "park_kultury_5", to: "oktyabrskaya", time: 2, type: "ride" },
    { from: "oktyabrskaya", to: "dobryninskaya", time: 2, type: "ride" },
    { from: "dobryninskaya", to: "paveletskaya_5", time: 2, type: "ride" },
    { from: "paveletskaya_5", to: "taganskaya", time: 2, type: "ride" },
    { from: "taganskaya", to: "kurskaya_5", time: 2, type: "ride" },
    { from: "kurskaya_5", to: "komsomolskaya_5", time: 2, type: "ride" },
    { from: "komsomolskaya_5", to: "prospekt_mira", time: 2, type: "ride" },
    { from: "prospekt_mira", to: "novoslobodskaya", time: 2, type: "ride" },
    { from: "novoslobodskaya", to: "belorusskaya_5", time: 2, type: "ride" },
    { from: "belorusskaya_5", to: "krasnopresnenskaya", time: 2, type: "ride" },
    { from: "krasnopresnenskaya", to: "kievskaya_5", time: 2, type: "ride" },
    { from: "kievskaya_5", to: "park_kultury_5", time: 2, type: "ride" },

    // TRANSFERTS - Stations de correspondance

    // Park Kultury (Ligne 1 ↔ Ligne 5)
    { from: "park_kultury", to: "park_kultury_5", time: 3, type: "transfer" },
    { from: "park_kultury_5", to: "park_kultury", time: 3, type: "transfer" },

    // Kievskaya (Ligne 3 ↔ Ligne 4 ↔ Ligne 5)
    { from: "kievskaya", to: "kievskaya_4", time: 3, type: "transfer" },
    { from: "kievskaya", to: "kievskaya_5", time: 3, type: "transfer" },
    { from: "kievskaya_4", to: "kievskaya", time: 3, type: "transfer" },
    { from: "kievskaya_4", to: "kievskaya_5", time: 2, type: "transfer" },
    { from: "kievskaya_5", to: "kievskaya", time: 3, type: "transfer" },
    { from: "kievskaya_5", to: "kievskaya_4", time: 2, type: "transfer" },

    // Kuntsevskaya (Ligne 3 ↔ Ligne 4)
    { from: "kuntsevskaya", to: "kuntsevskaya_4", time: 3, type: "transfer" },
    { from: "kuntsevskaya_4", to: "kuntsevskaya", time: 3, type: "transfer" },

    // Arbatskaya (Ligne 3 ↔ Ligne 4)
    { from: "arbatskaya", to: "arbatskaya_4", time: 3, type: "transfer" },
    { from: "arbatskaya_4", to: "arbatskaya", time: 3, type: "transfer" },

    // Smolenskaya (Ligne 3 ↔ Ligne 4)
    { from: "smolenskaya", to: "smolenskaya_4", time: 3, type: "transfer" },
    { from: "smolenskaya_4", to: "smolenskaya", time: 3, type: "transfer" },

    // Belorusskaya (Ligne 2 ↔ Ligne 5)
    { from: "belorusskaya", to: "belorusskaya_5", time: 3, type: "transfer" },
    { from: "belorusskaya_5", to: "belorusskaya", time: 3, type: "transfer" },

    // Paveletskaya (Ligne 2 ↔ Ligne 5)
    { from: "paveletskaya", to: "paveletskaya_5", time: 3, type: "transfer" },
    { from: "paveletskaya_5", to: "paveletskaya", time: 3, type: "transfer" },

    // Kurskaya (Ligne 3 ↔ Ligne 5)
    { from: "kurskaya", to: "kurskaya_5", time: 3, type: "transfer" },
    { from: "kurskaya_5", to: "kurskaya", time: 3, type: "transfer" },

    // Komsomolskaya (Ligne 1 ↔ Ligne 5)
    { from: "komsomolskaya", to: "komsomolskaya_5", time: 3, type: "transfer" },
    { from: "komsomolskaya_5", to: "komsomolskaya", time: 3, type: "transfer" },

    // Prospekt Mira (Ligne 5 ↔ Ligne 6) - mais ligne 6 pas incluse, à ignorer ou garder pour plus tard
    // Oktyabrskaya (Ligne 5 ↔ Ligne 6) - mais ligne 6 pas incluse

    // Biblioteka Lenina ↔ Arbatskaya (Ligne 1 ↔ Ligne 3)
    { from: "biblioteka_lenina", to: "arbatskaya", time: 4, type: "transfer" },
    { from: "arbatskaya", to: "biblioteka_lenina", time: 4, type: "transfer" },

    // Biblioteka Lenina ↔ Aleksandrovsky Sad (Ligne 1 ↔ Ligne 4)
    { from: "biblioteka_lenina", to: "aleksandrovsky_sad", time: 3, type: "transfer" },
    { from: "aleksandrovsky_sad", to: "biblioteka_lenina", time: 3, type: "transfer" },

    // Teatralnaya ↔ Okhotny Ryad (Ligne 2 ↔ Ligne 1)
    { from: "teatralnaya", to: "okhotny_ryad", time: 3, type: "transfer" },
    { from: "okhotny_ryad", to: "teatralnaya", time: 3, type: "transfer" },

    // Teatralnaya ↔ Ploshchad Revolyutsii (Ligne 2 ↔ Ligne 3)
    { from: "teatralnaya", to: "ploshchad_revolyutsii", time: 3, type: "transfer" },
    { from: "ploshchad_revolyutsii", to: "teatralnaya", time: 3, type: "transfer" },


];