# TODO_App
The purpose of this assignment is to assess your ability to design and build a web
application using the .Net/React stack. An assignment that is common is the classical TODO
App, where a client wants a way to keep track of tasks on a daily basis. In this scenario let’s
say our client wants a way for each employee in a company to keep track of personal daily
tasks. The credentials of personnel is given as an unique username and a task is described
in a text format.

To summarise the technical aspects of this assignment:
The server needs to be created using .Net Core 3^ with a simple REST protocol following
the model-controller pattern. Here you need to introduce two endpoints, /auth and /tasks. In
order to authenticate a user of the system, the /auth endpoint has to see a correct username
of the system. When a username is confirmed a token is sent as a response. For the /tasks
endpoint an authenticated user can read one, read all, create, update or delete (CRUD) a
daily task.

For the client app, this needs to be created in react using the create-react framework, with a
minimum of two pages. A page where the user can login and one where the user is able to
CRUD daily tasks. When authenticated, a good tip is to use the headers attribute of the
request to place a token. This can be created as a more general client where:

No auth: doRequest () => request with empty header
Auth: doRequest () => load token, request with “Bearer” header
