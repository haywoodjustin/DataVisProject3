from bs4 import BeautifulSoup
import requests as req
import csv 

trans = [
    ["Entry", "Season", "Episode_Num", "Episode_Title", "Speaker", "Line"],
]

episode_doc = req.get('https://rickandmorty.fandom.com/wiki/Pilot/Transcript')

if(episode_doc):
    S = BeautifulSoup(episode_doc.content , 'html.parser')
    # print(S.prettify())

    lines =  S.find('div', {"class": "poem"})
    lines = lines.findChildren()
    
    for line in lines:
        print(line)

        