# wordle-clone
A clone of worlde in Norwegian. Made in vanilla JavaScript with a whole bunch of HTML. 

# Starting updates of wordlist 

    sudo apt-get install cron 

setup schedule with crontab -e 

    0 0 * * * /usr/bin/python3 /var/www/wordle-clone/wordlists/updateTodaysWord.py >> cron.log 2>&1

The python script should now run at 00:00 every day and update todays word.


