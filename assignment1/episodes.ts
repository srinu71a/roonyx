import axios from 'axios';

type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: { name: string, url: string },
    location: { name: string, url: string },
    image: string,
    episode: string[],
    url: string,
    creeated: string
};

type Episode = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string
};

type EpisodeJSON = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: Character[],
    url: string,
    created: string
};

type GetEpisodesResponse = {
    info: {
        count: number,
        pages: number,
        next?: string,
        prev: string
    },
    results: Episode[];
};

/**
 * Takes characterUrl as param and return character details JSON data
 * @param characterUrl url to fetch character JSON
 */
async function getCharacterJSON(characterUrl: string) {
    const { data } = await axios.get<Character>(
        characterUrl,
        {
            headers: {
                Accept: 'application/json',
            },
        },
    )
    return data;
}

/**
 * Takes all episodes and replaces the characters with respective character JSON data
 * @param allEpisodes list of all the available episodes
 */
async function populateCharacterJSON(allEpisodes: Episode[]) {
    // characterCacheData object holds the data of alredy fetched characters.
    // if the same character comes in other episode, data from this object will be used instead of making api call
    const characterCacheData = {};
    const allEpisodesWithCharacterJSON: EpisodeJSON[] = [];

    for (let episode of allEpisodes) {
        console.log('Fetching characters for episode ::', episode.name);
        let charactersJSON = [];

        for (let characterUrl of episode.characters) {
            if (!characterCacheData[characterUrl]) {
                const characterJSON = await getCharacterJSON(characterUrl);
                charactersJSON.push(characterJSON);
                characterCacheData[characterUrl] = characterJSON;
            } else {
                charactersJSON.push(characterCacheData[characterUrl]);
            }
        }

        console.log('Successfully fetched characters for episode ::', episode.name);
        allEpisodesWithCharacterJSON.push({ ...episode, characters: charactersJSON });
    }

    return allEpisodesWithCharacterJSON;
}

/**
 * Fetches all the episodes from paginated episodes apis
 * Populates the characters with respective data and logs the response to console 
 */
async function getEpisodes() {
    let nextEpisodesUrl = 'https://rickandmortyapi.com/api/episode';
    let allEpisodes: Episode[] = [];
    console.log('Fetching episodes');
    do {
        const { data } = await axios.get<GetEpisodesResponse>(
            nextEpisodesUrl,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        )
        allEpisodes = [...allEpisodes, ...data.results];
        nextEpisodesUrl = data.info.next;
    } while (nextEpisodesUrl);
    console.log('Successfully fetched all episodes');
    const episodesWithCharacterJSON = await populateCharacterJSON(allEpisodes);
    console.log({ episodesWithCharacterJSON });
    return episodesWithCharacterJSON;
}

getEpisodes();
