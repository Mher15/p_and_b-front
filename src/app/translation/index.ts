import {ru_RU} from './ru_RU'

export const avaibleLocalies = {
    ru_RU: 'ru_RU'
}

export const currencyUnitMap = {
    [avaibleLocalies.ru_RU]: '\u20bd'
}

type TranslationKey = string;

type Translation = {
    [key: TranslationKey]: string
}

const getTranslation = (locale: string): Translation => {
    switch(locale) {
        case avaibleLocalies.ru_RU:
        default:
            return ru_RU;
    }
};


export const translate = (translationKey: string, locale: string) => {
    const translation = getTranslation(locale);
    
    if(!translation || !translationKey){ 
        throw new Error(`Can't get ${locale} translation by ${translationKey}`)
    }

    return translation[translationKey];
}