# YetAnotherTodoListProject

Lancer l'emulateur : ionic serve -l
Installer une plateforme android : ionic cordova platform add android
Installer et lancer l'appli sur le smartphone : ionic cordova run android

L'apk est disponible à la racine du projet

Fonctionnalités :
Todolist complète : création, édition, suppresion liste
Item de liste : création, édition, suppression item
Listes synchronisées avec le cloud firebase
Seul les utilisateurs authentifiés ont accès aux listes (règles DB)
Authentification via adresse email fonctionnelle
Possibilité de prendre une photo lors de la création d'une liste
Cette photo est stockée sur firebase et affichée lorsque l'on consulte le détail de la liste

Issues :
Les SSO ne sont pas complètement fonctionnels : le login via Google lève une erreur dont nous n'avons pas trouvé de fix malgré de nombreuses recherchent.
La configuration  est complète, nous avons vérifié la totalité du processus de configuration des SSO, mais l'erreur est toujours levée.
Pour Facebook, le domaine de notre application n'est pas reconnu malgré les configurations une fois de plus correctement effectuées
Lors de la création d'items de liste, à partir de la seconde le refresh de la liste ne fonctionne pas
De même, après la prise d'une photo, elle n'est pas affichée sur le formulaire malgré qu'elle soit bien uploadée