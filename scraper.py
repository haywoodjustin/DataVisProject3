from bs4 import BeautifulSoup
from os import listdir
from os.path import isfile, join
import requests as req
import os
import re
import csv 


def get_first_3_seasons_episode_order():
    site = req.get('https://rickandmorty.fandom.com/wiki/Interdimensional_Cable_2:_Tempting_Fate/Transcript')
    episode_master_list = []

    #get table with episodes name
    soup = BeautifulSoup(site.text, 'html.parser')
    soup = soup.find_all("table")[-1]
    episode_list = soup.find_all('tr')
    episode_list = episode_list[2::]

    episode_num = 1
    for each in episode_list:
        episode_name = each.find('td')
        episode_name = episode_name.find_all('b')
        for each in episode_name:
            episode_dict = {}
            try:
                episode_name_plain_text = each.find('a').text
            except:

                #have to manually add this since this is the page I am using in my http get request
                episode_name_plain_text = 'Interdimensional Cable 2: Tempting Fate'

            episode_dict['episode_name'] = episode_name_plain_text
            episode_dict['episode_num'] = episode_num

            episode_master_list.append(episode_dict)

            episode_num += 1
    
    return episode_master_list


episode_master_list = get_first_3_seasons_episode_order()

d = {"episode_name": "Edge of Tomorty: Rick Die Rickpeat", "episode_num": 32}
episode_master_list.append(d)
d = {"episode_name": "The Old Man and the Seat", "episode_num": 33}
episode_master_list.append(d)
d = {"episode_name": "One Crew over the Crewcoo's Morty", "episode_num": 34}
episode_master_list.append(d)
d = {"episode_name": "Claw and Hoarder: Special Ricktim's Morty", "episode_num": 35}
episode_master_list.append(d)
d = {"episode_name": "Rattlestar Ricklactica", "episode_num": 36}
episode_master_list.append(d)
d = {"episode_name": "Never Ricking Morty", "episode_num": 37}
episode_master_list.append(d)
d = {"episode_name": "Promortyus", "episode_num": 38}
episode_master_list.append(d)
d = {"episode_name": "The Vat of Acid Episode", "episode_num": 39}
episode_master_list.append(d)
d = {"episode_name": "Childrick of Mort", "episode_num": 40}
episode_master_list.append(d)
d = {"episode_name": "Star Mort Rickturn of the Jerri", "episode_num": 41}
episode_master_list.append(d)
d = {"episode_name": "Mort Dinner Rick Andre", "episode_num": 42}
episode_master_list.append(d)
d = {"episode_name": "Mortyplicity", "episode_num": 43}
episode_master_list.append(d)
d = {"episode_name": "A Rickconvenient Mort", "episode_num": 44}
episode_master_list.append(d)
d = {"episode_name": "Rickdependence Spray", "episode_num": 45}
episode_master_list.append(d)
d = {"episode_name": "Amortycan Grickfitti", "episode_num": 46}
episode_master_list.append(d)
d = {"episode_name": "Rick & Morty's Thanksploitation Spectacular", "episode_num": 47}
episode_master_list.append(d)
d = {"episode_name": "Gotron Jerrysis Rickvangelion", "episode_num": 48}
episode_master_list.append(d)
d = {"episode_name": "Rickternal Friendshine of the Spotless Mort", "episode_num": 49}
episode_master_list.append(d)
d = {"episode_name": "Forgetting Sarick Mortshall", "episode_num": 50}
episode_master_list.append(d)
d = {"episode_name": "Rickmurai Jack", "episode_num": 51}
episode_master_list.append(d)
d = {"episode_name": "Solaricks", "episode_num": 52}
episode_master_list.append(d)
d = {"episode_name": "Rick: A Mort Well Lived", "episode_num": 53}
episode_master_list.append(d)
d = {"episode_name": "Bethic Twinstinct", "episode_num": 54}
episode_master_list.append(d)
d = {"episode_name": "Night Family", "episode_num": 55}
episode_master_list.append(d)
d = {"episode_name": "Final DeSmithation", "episode_num": 56}
episode_master_list.append(d)
d = {"episode_name": "Juricksic Mort", "episode_num": 57}
episode_master_list.append(d)
d = {"episode_name": "full Meta Jackrick", "episode_num": 58}
episode_master_list.append(d)
d = {"episode_name": "Analyze Piss", "episode_num": 59}
episode_master_list.append(d)
d = {"episode_name": "A Rick in King Mortur's Mort", "episode_num": 60}
episode_master_list.append(d)
d = {"episode_name": "Ricktional Mortpoon's Rickmas Mortcation", "episode_num": 61}
episode_master_list.append(d)


#https://rickandmorty.fandom.com/wiki/Anatomy_Park_(episode)/Transcript

def get_transcripts_link(episode_master_list):
    page = req.get('https://rickandmorty.fandom.com/wiki/Category:Transcripts')
    soup = BeautifulSoup(page.text, 'html.parser')
    mydivs = soup.find_all("li", {"class": "category-page__member"})

    for each in mydivs:
        link = each.find('a')
        episode_title_first = link.get('title')
        link = "https://rickandmorty.fandom.com/" + link['href']
        episode_title = episode_title_first.split('/')[0]

        if len(episode_title_first.split('/')) > 1:

            for i in episode_master_list:
                if i['episode_name'] == episode_title:
                    i['URL'] = link

    return episode_master_list
    


episode_master_list = get_transcripts_link(episode_master_list)


#LOGIC TO GET PATH TO TEXT FILES
current_directory = os.path.dirname(__file__)
data_path = current_directory + "\\data"
onlyfiles = [f for f in listdir(data_path) if isfile(join(data_path, f))]


episode_num_list = []
for file in onlyfiles:
    if file.endswith('.txt'):
        # file_path = data_path + "\\" + file
        episode_num = int(file.split('episode')[1].split('.')[0])
        episode_num_list.append(episode_num)

episode_num_list.sort()


            
#LOOP THROUGH AND CLEAN TEXTFILES
for x in episode_num_list:
    file_name = data_path + "\\episode" + str(x) + '.txt'
    file_name_CLEAN = data_path + "\\episode" + str(x) + '_CLEANED.txt'
    with open(file_name, 'r', encoding='utf-8') as r, open(file_name_CLEAN, 'w', encoding='utf-8') as o:
        for line in r:
            if line.strip():
                line = re.sub("[\(\[].*?[\)\]]", "", line)
                if line.strip() and ('*' not in line and '(' not in line and ')' not in line and '[' not in line and ']' not in line and '{' not in line and'}' not in line):
                    o.write(line) 



# #CSV LOGIC
# header = ['episode_name,' 'episode_num', 'character', 'line']

# with open('data/data.csv', 'w') as csvfile:
#     csvwriter = csv.writer(csvfile)

#     csvwriter.writerow(header)

