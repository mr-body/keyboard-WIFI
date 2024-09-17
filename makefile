NAME = kumboo

all: ${NAME}

${NAME}:
	yarn start 

config:
	eas build:configure

build:
	eas build --platform android

git:
	git add .
	git status
	git commit -m "push to github makefile"
	git push -u origin HEAD