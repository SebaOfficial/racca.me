git pull origin
composer update

# Removing all the previews in case they are updated
rm -fr src/previews/*

# Making sure nginx can create new previews
chmod -R 777 src/previews/