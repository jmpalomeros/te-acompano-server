TE ACOMPAÑO

DESCRIPCIÓN:

TE ACOMPAÑO es una web/app creada con la única finalidad de conectar a personas de tu entorno para prestar y/o recibir servicios de voluntariado.
Previo registro, el usuario puede ver y buscar los servicios que quiere ofrecer o demandar, sirviendose para ello de dos buscadores. El primero filtra según el titulo del servicio. El segundo en función de la categoria del servicio: ayuda, ocio, otros. El usuario también dispone de un listado con los servicios existentes, pudiendo revisar cada uno de ellos clicando sobre él, informándose igualmente acerca del usuario que lo ofrece y leyendo las reseñas que otros usuarios han compartido.

Una vez elegido el servicio del que quiere servirse, deberá aceptar el servicio, desapareciendo del listad y quedando registrado tanto en el perfil del oferente del servicio como del solicitante/aceptante.

En el perfil, el usuario puede consultar sus datos y editarlos. También dispone de un listado relacionando los servicios que ofrece y los que demanda, figurando los que ha acepetado, pudiendo hacer reseñas sobre ellos. En este apartado el usuario también podrá crear un servicio y editarlo, antes de que sea aceptado, para su publicación en el listado de servicios.

Las reseñas, tanto creadas como recibidas, pueden consultarse, editarse y borrarse desde el propio perfil del usuario.

De este modo, TE ACOMPAÑA nace con la finalidad de facilitar la labor del voluntariado, conectando personas directamente sin necesidad de recurrir a instituciones, creando una red entre los usuarios que fomenta la colaboración, la ayuda y el contacto entre personas de un mismo entorno.

FLUJO DE NAVEGACIÓN:

Home: Página de inicio en la que se ofrece información sobre la web/app.
Registro: El usuario accede una vez se encuentra en la web cliclando sobre el icono ubicado en el navbar.Es necesario registrarse para acceder a la web/app previo logado.
Logado: Tras el registro el usuario debe logarse introducciendo los campos solicitados.
Salir/Deslogado: El usuario finaliza sesión y vuelve a la página de inicio.
Listado de servicios: Espacio en el que figuran los post con los servicios ofrecidos, pudiendo acceder a ellos cliclando sobre el titulo. 
Busqueda de servicios por tipo de servicio: El buscador filtra en los servicios ofertados en atención a la categoria que tienen: Ayuda, Ocio, Otros
Busqueda de servicio por el titulo: El buscador ofrece los resultados obtenidos en un campo libre.
Aceptar un servicio: Si el usuario está interesado en recibir un servicio, solo tiene que cliclar sobre el boton de acpetado una vez ha revisado el contenido del servicio y consultando los datos del oferente.
Consultar detalles del servicio: Clicando sobre el propio servicio.
Consultar detalles del oferente del servicio: Clicando sobre el oferente, puedes consultar sus datos, servicios ofrecidos y reseñas que han realizado otros usuarios.
Perfil: El usuario accede a su perfil, pudiendo consultar y editar sus datos.
Crear servicio: Desde su perfil, el usuario puede crear un servicio y editarlo antes de que sea aceptado.
Servicios aceptados: Sección en la que figuran todos los servicios aceptados para su consulta, revisión de las reseñas que existen sobre el oferente y, en su caso, crear reseña sobre ese servicio una vez se ha efectuado.
Servicios ofrecidos: En esta sección se encuentran todos los post creados por el usuario en los que ofrece los diversos servicios que ha creado.
Reseñas: Apartado en el que el usuario puede consultar las reseñas que ha creado y que ha recibido, pudiendo actualizar y borrar las primeras.
Error: Página a la que se redirige al usuario cuando existe algún error.
Not-found: Página a la que se redirige al usuario cuando no existe resultado para su busqueda.

RUTAS:

Home -	/
Signup -	/signup
Login -	/login
Profile -	/profile
Service List -	/service
Service details -	/service/:id/details
Volunteer details	- /volunteer/:id/details
NotFound -	/notFound
Error -	/error

POST	‘/auth/signup’
POST	‘/auth/login’
GET	‘/auth/verify’

GET	‘/service’
POST ‘/service’
GET 	‘/service/:id’
PATCH	‘/service/:id’
	
GET	‘/review’
POST	‘/review’
GET 	‘/review/:id’
PATCH	‘/review/:id’
DELETE	‘/review/:id’
	
GET	‘/user’
PATCH	‘/user/edit’ 
PATCH '/user/off’

LINKS

Miro: https://miro.com/app/board/uXjVPFG66i8=/

Github: 
Link al repositorio del servidor: https://github.com/jmpalomeros/te-acompano-server
Link al repositorio del cliente: https://github.com/jmpalomeros/te-acompano-client

Deploy Link:
Servidor: https://app.cyclic.sh/#/app/jmpalomeros-te-acompano-server/builds/2022-11-18T10:22:44.427Z/1668768622001
Cliente: https://app.netlify.com/sites/te-acompano/deploys

Slides:
https://docs.google.com/presentation/d/1oJj8tne9rU3rWHqulUJSrQga3NVExb33G3b1Zck25f8/edit?usp=sharing