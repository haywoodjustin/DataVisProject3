from bs4 import BeautifulSoup
import requests as req
import csv 

trans = [
    ["Entry", "Season", "Episode_Num", "Episode_Title", "Speaker", "Line"],
]
entry = 1; 

episode_doc = req.get('https://rickandmorty.fandom.com/wiki/Pilot/Transcript')

if(episode_doc):
    S = BeautifulSoup(episode_doc.content , 'html.parser')
    # print(S.prettify())

    listOfBold =  S.find_all('div', class_='poem')
    print(listOfBold[0]) 
    # print(listOfBold)
    # for line in listOfBold:
    #     print(line)

    # print(trans) 
        