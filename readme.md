========

Thesis **Sales Management System** presented at the
Technical  University of Moldova, was written in english by Cristian
Cartofeanu as a Bachelor project. It contains 66 pages and includes 23
figures, 14 references. The thesis consists of a list of figures, list
of abbreviations, introduction, four chapters, conclusions and reference
list.

The project aims to solve one of the most frequent problems commercial
institutions are facing - Queue formations at the cash desks. The
solution that the sales management system comes with is a new  sales
model in Republic of Moldova, where every customer has an alternative
way of checking out compared to the traditional one.

In this model costumers are allowed to play the role of cashiers
themselves while shopping, by scanning the products of the shelf
instantly, in comparison with the classical way when all the products
need to be scanned at checkout.        

The system consists of three core components. The first one is the web
application that serves as the back end of the platform where the Web
API based on HTTP/REST is defined and offered to API consumers.
Additionally the web application offers a browser interface for the
client side, that is handled both by costumers and commercial
representatives. The second component represents the mobile application
that consumes the API and acts as a checkout terminal. The last main
component is the database server that acts as a warehouse where all the
commercial data is stored and organised for later analytics.  

The product has been built using a variety of technologies. The back end
of the system was written using JavaScript on Node.js runtime
environment. In order to conform to the Model View Controller design
pattern Express.js framework has been used.

The technology used for building the mobile application was Apple’s
Swift programming language in combination with the XCode interactive
development environment. As for the data management, MongoDB database
was chosen as a solution for the scalability of the system and for the
large volumes of rapidly changing data. Moreover, MongoDB is an integral
part of the MEAN software stack and therefore its adoption permitted
building the dynamic web and mobile application.

In order for the system to be generic (i.e less dependent on the
retailer’s existing POS hardware, it has been designed so that it
enables customers to make their payments online, through the client
mobile application, using their credit card. Conveniently, the
transactions processed through the Stripe payment gateway are displayed
in real-time and can be performed from anywhere around the world on most
of the existing devices. How the money are transferred to the retailers’
financial pool is out of scope for this thesis, however it should be
fairly easy to arrange the capital flow in a business model. The
standard cash payment is not neglected though. Should they choose this
option, the consumers can generate a final QR code needed to finish
their payment at the cash desk, that is composed of all the shopping
cart products and their related data, which can be registered in the
retailer’s local system. Engagement, awareness, optimisation and
flexibility are therefore pillars that define the product’s
philosophy—to make the shopping experience pleasant and efficient for
the consumers.



Introduction 
============

Since the year 2000, around three quarters of retail sales growth has
occurred through online channels. In 2015, it was estimated that the
online medium accounts for about 8% of the total retail sales. What is
equally impressive, is that the three sectors that have not been
significantly influenced by the e-commerce over the years, which are:
automobile industry, gasoline stations and grocery markets count for
almost half of the total retail sales. Studies have shown that online’s
presence in the addressable market of the latter sector evolves around
16% and is expanding rapidly at a predicted rate of approximatively 15%
per year. This expected growth has a far steeper slope than that of
traditional retail.

Even if the success stories of online e-commerce businesses, such as
Amazon, Ebay or Alibaba captivated the whole world with their innovative
views, consumers still define a clear boundary between the in-store and
internet purchases. Although the two type of purchases are almost
inter-exchangeable, the problem of groceries poses a challenge for the
e-commerce venturers - the food. The food is a commodity which is highly
personal, subjective and important to most people to sense. Most of the
important alimentary products people buy are easily perishable and
volatile. Another instance of commodities which require personal
attendance in the supermarkets are clothes. These two examples suffice
in order to prove that physical retailers along with their online
competitors need to cooperate in order to deliver best possible services
for satisfying the whole demand spectrum.

It has been estimated that by the end of 2018 the total retail sales
worldwide will reach \$28.300 trillion, while the retail e-commerce
sales worldwide will reach \$2.489 trillion. Even if the e-commerce
sales make up only about 8.8% of the total sales by then, compared to
2016, the former sum registers a 10% increase, while the latter
registers a 25% increase. Consequently, it is almost imperative for
existing and prospecting successful retail businesses to offer consumers
the flexibility of both digital and physical purchases.

The proposed solution is Sales Management System - that aims for two
goals. First, to facilitate the overall shopping experience of customers
by significantly reducing the time needed to wait in lines, by providing
an idiomatic way of searching, inspecting, adding and buying products
off the shelf. Second, to manage the inventory of all the products in
store, as well as gather useful transaction data, which is to be
subjected for analytics. The product is designed to be used both by
consumers (who can buy products remotely, via the e-commerce website or
in-store, via the mobile app) and by retail administrators, who can
leverage their sales by inspecting prospective statistics.

The new sales model does not require to change the existing
infrastructure of the supermarkets. Conceptually, all the products can
be easily added into the system, assigned an unique QR label and placed
on specific lanes in the supermarket to capture the public’s attention.

The thesis is divided into four chapters. The first chapter describes
the problem, overview of the market and over the system’s concept and
the web application architecture. The second chapter covers the software
design with UML diagrams. The third chapter describes the implementation
of the system along with the technologies used. The fourth chapter
analyses the project form an economic point of view and discusses the
marketing strategies. Finally, the conclusions are presented, with
comments about future work.

Project Analysis and System Requirements
========================================

Problem Definition
------------------

Nowadays, supermarkets grow continually in size to satisfy the diversity
of customer needs. One of the main reasons the supermarket industry is
expanding so fast is the population growth and density. Thus, it is
important for the stores to be able to handle many customers
efficiently.

One problem that associates with serving customers is the waiting lines.
On average, in medium supermarkets during rush-hours customers stay
15-25 minutes in queues. This bottleneck causes two important problems:
loss of customer’s time and loss of supermarket’s income. Most often,
customers refuse to buy some products from the store as a consequence of
queue formation. For them, the spent time in the supermarket is critical
(the time to find and check out the products). Currently, there are many
efficient solutions for locating products (sorting the products, using
visual aids, commercials, etc.), however there are only a few basic
options that solve the check out process.

An example of trivial solution is introducing cash desks with limited
number of products per customer, but this solves the issue only for a
small portion of the customers (a customer with three products wouldn’t
have to wait for another customer that has many more products).
Apparently, installing more cash desks would solve the waiting in line
problem, however this implies additional costs for paying the employees
- this will lead to reducing the supermarket’s income and/or increasing
the product’s price.

Another example of a more advanced solution is the implementation of
self-checkout machines. The benefit to the retailer in providing
self-checkout machines is in reduced labour costs: one attendant can
often run four to six checkout lanes with the work of the cashier now
being assumed by the customer.

Nevertheless, both of these solutions address only a part of the
customers. Moreover, all the customers still need to interact with each
product twice - taking it from the shelf and presenting it at the cash
desk.

Problem Solution
----------------

The proposed solution is a system that has several components that
communicate with each other in real time. The aim of this system is to
facilitate the customer’s shopping experience by reducing the time spent
at the cash desk.

The proposed model and workflow is as follows:

-   The person downloads the mobile application from the AppStore;

-   The person registers an account using either the application or the
    website;

-   The person logs in the application (at this step, one can begin
    shopping);

-   Once the customer enters the supermarket and grabs a product from
    the shelf, he/she scans the product’s QR code using the system’s
    mobile app;

-   Once the product is scanned, the app displays information about the
    item;

-   If the customer wants to buy it, he/she may add it in any available
    quantity in the virtual cart and proceed to the next product;

-   When the customer finishes choosing the products he/she may choose
    between the two payment options:

    -   Either he/she pays online, using the credit card;

    -   Or he/she pays with cash and a final QR code is generated which
        contains the total information about the products. At this step,
        the customer is required to scan only the final QR code at the
        cash desk. In this way the customer spends the same amount of
        time as for buying one item, independently of how many products
        there are in the cart.

-   After the payment, periodically an attendant may check random
    customers concerning their products(i.e if the products match the
    purchase history).

By using the proposed solution, the waiting time in queues will be
considerably reduced and as a consequence, the income of the retailer
will be increased because the rotation of the clients will be much
faster.

Considering that the system consists of several complex components, the
technical responsibilities were divided.

-   Mobile application;

-   Server-side application;

-   Database;

-   Web interface.

The technical responsibilities assigned to myself was the implementation
of the server-side for the application, the web interface and
architecting the database (database was a common responsibility shared
with my colleague that is developing mobile application).

Overview of the market
----------------------

Currently, there are similar products on the international market that
evolve around the same concept – self-checkout solution for retailers.
An instance of such a product is the Scandit’s self-checkout app that
lets the customers take control of their shopping experience by scanning
items as they shop, eliminating the phenomena of long lines. The
activity flow of a customer is as follows:

At first, the customer checks in the store to begin shopping, then a
page is presented to the customer displaying specials for their local
store. Afterwards, the customer can choose either to scan items to cart
using Barcode scanning technology or to add items via smart search.
While in the process of buying items, customers can review and change
quantity of items before checking out. At the checkout point, the
customer scans a QR code and follows the instructions for payment.

Another similar product on the Swedish market is an unmanned shop, in
the southern Sweden village of Viken. There, customers can use a
smartphone app to be allowed to scan their own shopping, meaning no
staff are required. The futuristic staff-free shop was the idea of local
resident Robert Ilijason and shop opened after the application was
approved by Apple in January, 2016. In that shop, people are allowed to
open the door only if they are holders of a Swedish Bank ID, so that
their financial history would be tracked in the scenario of an
exceptional situation, such as theft or vandalisation. Furthermore, the
customers may take any product off-the-shelf without the need to pay
whatsoever. The idea behind it, is that when customers scan the products
and add them to their virtual cart, the data is sent to a server that
stores a database and register scanned products. Each month, the
customers receive an invoice covering the history of all of their
transactions that needs to be paid due time. The store holds multiple
surveillance cameras in the event that customers scan deliberately wrong
products or don’t scan all of them.

Overview of the system’s concept
--------------------------------

### Systems advantages

The most valuable advantage for the customer the system offers we
believe is that the platform saves time for them. Besides customers,
retails administrators also finds in this system a lot of advantages.
For them the most important advantage is that the system monitors their
sails with a lot of specific details.

A list of other also significant advantages are:

-   The system provides both a mobile and a web interface for the
    customers as well as for the retailer’s administration;

-   Products can be added to the virtual cart by scanning them using QR
    technology, therefore retailers can access realtime information
    about the user’s shopping cart;

-   Products can be added to the virtual cart by using search, which is
    a good option for the customers that want to use the web
    application, or for those who want to shop remotely;

-   Customers can view details about the products on their mobile app;

-   System accepts electronic payments using customer’s credit cards;

-   Customers have access to their history of purchases;

-   History of purchases can be used to generate valuable statistics;

-   Retailers can use the system’s interface for adding the products in
    the database and generate their QR codes;

-   It increases sales considerably by handling more customers in the
    same amount of time, compared to the traditional checkout process.

### System disadvantages

The biggest disadvantage at first look people find in our system is that
it can not guarantee security for the retails against the customers who
can steal products while self checking out. But this disadvantage in
long term will not be felt financial because of the increasing number of
transaction. In other words, the retails will sell much more and gain
bigger income then they can lose of the item stoled, mainly because in
average products dose not have big prices per unit. And because some of
the Moldavian people have unhealthy mentality at the begging the retails
will try to educate people by making some random chekings like at the
airport. In a such a way customers will understand that stealing is not
an option.

A list of other also significant disadvantages are:

-   The system requires a smartphone, or a computer;

-   Internet connection is mandatory for the system to work;

-   The system cannot guarantee total security, because it cannot
    exclude customers from stealing products, as it is based on people’s
    honesty (it would need additional staff and equipment to monitor the
    misbehaving customers, by using intelligent sensors that combine
    video and weight detections to prevent frauds.


System’s Software Design
========================

UML Diagrams
------------

Unified Modelling Language is a universally accepted as a standard of
visualising a software program using a set of diagrams. The notation is
used for designing and describing systems written in object-oriented
languages. The standard currently defines 13 types of diagrams organised
into two distinct groups: structural and behavioural. Structural
diagrams include class, package, object, component, composite structure
and deployment diagrams. Activity, sequence, use case, state,
communication, interaction overview and timing are behavioural diagrams.
To describe the current project the use case, activity, state,
deployment, component and sequence diagrams are used and presented
bellow.

### Use Case

In software and systems engineering, a use case is a list of actions or
event steps, typically defining the interactions between a role (known
in the Unified Modelling Language as an actor) and a system, to achieve
a goal. The actor can be a human or other external system. In systems
engineering, use cases are used at a higher level than within software
engineering, often representing missions or stakeholder goals.

The purpose of the following Use Case diagrams is to illustrate what
actions can be undertaken on the user’s behalf to benefit at most from
the application’s functionalities. The figure
\[developer-use-case-fig\_1\] and depicts how a customer and the retail
administrator can use the web application in order to engage in the
process of shopping products from a store. First of all, there is an
essential mandatory step to perform in order to be able for one to use
the client mobile application, that is - to create a user account. In
this way, each customer will be able to identify itself within the
system. Consequently, after the user creates an account, it must
authenticate in the system to start using it. One can easily
authenticate by inputing the associated email and password, which were
assigned during the registration process. Once the user logs in, it can
use the application’s functionalities such as: view a product info, add
product to cart, remove a product from cart, view cart info, check out -
paying with credit card.

The flow of the application use by the retail administrator (after
authentication) goes as follows (figure \[developer-use-case-fig\_2\]):

-   Navigates to the QR generator page;

-   Complete the new product form by introducing the product
    descriptions, price, etc;

-   Click generates for adding the product to the database and to
    generate the QR code image that can now be downloaded and printed.

The flow of the application use by the customer (after authentication)
goes as follows :

-   The user is displayed his/her profile page, that contains the
    associated information, the avatar and the history of purchases(if
    it’s the first time the user uses the app, the history is empty
    respectively);

-   The user clicks a navigation button that redirects the app from its
    profile view to the shopping cart, which may or may not contain
    products;

-   The user can view shopping cart info, such as the products added to
    the cart and the total, as well as the individual product price,
    quantity and description;

-   In case the user wishes to add a product, he/she clicks the
    navigation button that transitions the app from the shopping cart
    view to products catalogue;

-   Also the user can use our search feature engine to find a
    specific product. The search engine search for matching the name of
    the product or if the key word matches any of products description;

-   While viewing the product description, the user may choose the
    quantity of the product and after to add it to his own virtual cart;

-   When the user finishes shopping, it navigates back to the cart to
    view the totals;

-   If the user wants to remove a product he/she may use the remove
    function so the total price will be lower;

-   When the user wants to process to purchasing, he/she clicks the pay
    button and a payment form is displayed;

-   The user introduce the credit card credentials and then click pay.

![The use cases of the retail administrator using the system<span
data-label="developer-use-case-fig_2"></span>](../Figures/UML/UseCaseDiagram2){width="60.00000%"}

### State Machine

UML state machine diagrams depict the various states that an object may
be in and the transitions between those states. A state represents a
stage in the behaviour pattern of an object, and like UML activity
diagrams it is possible to have initial states and final states. An
initial state, also called a creation state, is the one that an object
is in when it is first created, whereas a final state is one in which no
transitions lead out of. A transition is a progression from one state to
another and will be triggered by an event that is either internal or
external to the object.

Figure \[developer-state-machine-fig\_1\] and
\[developer-state-machine-fig\_2\] present an example of state
transitions for the object that models the product. Initially, the
product is unassigned, meaning that it is still at its concept phase. At
this moment, the product is not added yet in the catalogue, therefore it
cannot be accessible within the system.

The second state the product can transit to, is called ‘Added to
catalogue’ and is triggered by the external event where the
administrator adds the product information using the web interface.
Given that the condition has been granted, a QR code is generated based
on the product’s data. The product thus switched its state - from the
abstract level conceptual model  to the actual realisation of it, by
being included in the database catalogue. From this state, the
transition jumps further to the state ‘For sale’  as well to the state
’Stored in database’. This is not non-deterministic because the process
of storing the product in database is an asynchronous task that is done
by the back end part of the system, while the ‘For sale’ state maps the
characteristics of the product’s physical representation, such as
availability and quality.

In order for the product to be stored in the database, it needs to pass
the product schema validation. In progression, the state further
transitions to the ‘Added to Cart’ state. The transition takes place if
the user use web application interface by adding to cart the product or
scans the QR code sticked on the product’s label using the mobile
application and chooses to add the specific product to the cart \[for
more info, check the use case diagram\]. Conversely, if the user decides
to discard the product from the cart, the state of the product changes
again to ‘Available for Sale’. Otherwise, if the user decided to make
the transaction and to purchase the cart product, the product now
changes its state to ‘Bought’. Furthermore, the product, after being
bought passes to the next state, called ‘Stored in Database’. At this
step, the product is saved in the user’s transaction history and is
reevaluated in the available stock as well. Note that two previous
states arrive at this destination (Added to catalogue and Bought). This
occurrence takes place because the product, when defined and created is
stored in a collection called products, which is separated from the
users collection, where all user’s transaction are recorded.

The final state is the ‘Removed from database’. This happens in two
scenarios: either the administrator removes the product from the
catalogue or the user deletes the product from his/her transaction
history.

![Product state machine diagram<span
data-label="developer-state-machine-fig_1"></span>](../Figures/UML/StatechartDiagram1){width="80.00000%"}

![Cart state machine diagram<span
data-label="developer-state-machine-fig_2"></span>](../Figures/UML/StatechartDiagram2){width="80.00000%"}

### Deployment

A deployment diagram models the run-time architecture of a system. It
shows the configuration of the hardware elements (nodes) and shows how
software elements and artifacts are mapped onto those nodes. A Node is
either a hardware or software element. It is shown as a
three-dimensional box shape, as shown below. A node instance can be
shown on a diagram. An instance can be distinguished from a node by the
fact that its name is underlined and has a colon before its base node
type. An instance may or may not have a name before the colon.

Figure \[developer-deployment-diagram-fig\_1\] presents the deployment
architecture of a system. The deployment diagram is common both for the
mobile application and for the web application. The system’s
architecture is based on a Sales Database Server which hosts a running
instance of a MongoDB database. The Sales Database Server communicates
with the Sales Application Server via LAN internal network link. The
Sales Application Server hosts the NodeJS application, where the backend
of the system is implemented. This server further communicates with the
Sales Web Server that has a web service running on nginx that acts as a
load balancer and proxy for the web requests. The communication between
the App Server and the Web Server is done through encrypted LAN channel,
backed up by a DMZ firewall Link. The Web Server further directs the
communication to the client device that runs either an iOS application
or a Browser website. The communication channel is via Internet Link,
3G, 4G. The protocol of communication is HTTP/REST.

![System deployment diagram<span
data-label="developer-deployment-diagram-fig_1"></span>](../Figures/UML/DeploymentDiagram1){width="100.00000%"}

### Component

The component diagram’s main purpose is to show the structural
relationships between the components of a system.

The figure \[developer-component-diagram-fig\_1\] demonstrates some
components and their inter-relationships. Assembly connectors connect
the provided interfaces supplied by Product and Customer to the required
interfaces specified by Order. A Dependency relationship maps a
customer’s associated account details to the required interface Payment,
indicated by Order.

![System component diagram<span
data-label="developer-component-diagram-fig_1"></span>](../Figures/UML/ComponentDiagram1){width="70.00000%"}

### Activity

In UML, an activity diagram is used to display the sequence of
activities. Activity diagrams show the workflow from a start point to
the finish point detailing the many decision paths that exist in the
progression of events contained in the activity. They may be used to
detail situations where parallel processing may occur in the execution
of some activities. Activity diagrams are useful for business modelling
where they are used for detailing the processes involved in business
activities.

Figure \[developer-activity-diagram-fig\_1\] describes the searching a
product workflow related to the searching business process. It
illustrates specifically the searching option activity. There are two
main components: User and System. The flow start when the user, after
authentication access his profile page. After that he/she can use 2
types of searching: regular one and dynamic one. Both of them have the
same logic and algorithm, the only difference is that one uses AJAX in
additional so the entire page dose not refresh. Once the user selected
on of the products page, he/she can start making the query. After the
request with the query is received by the server an middleware service
for searching start it’s algorithm. If the result finds any matches, the
system displays them, if not a message explaining that no matches were
found will be displayed.

![System activity diagram for searching a product<span
data-label="developer-activity-diagram-fig_1"></span>](../Figures/UML/ActivityDiagram1){width="70.00000%"}

### Sequence

A sequence diagram is a form of interaction diagram which shows objects
as lifelines running down the page, with their interactions over time
represented as messages drawn as arrows from the source lifeline to the
target lifeline. Sequence diagrams are good at showing which objects
communicate with which other objects; and what messages trigger those
communications. Sequence diagrams are not intended for showing complex
procedural logic.

Figure \[general-Sequence-diagram-fig\] shows the mechanism of how
instances communicate with each other over time. The sequence diagram
resembles the communication of objects that participate at the placing
an order stage of the application. The components are: The Customer GUI
instance, the Customer interface instance, the Customer Process service,
the Cart server, the Checkout order process, Order server and Customer
server. At first using the Customer GUI the user places his/her order
request using the Customer interface. Once the order request is placed
it is processed by Customer process instance. If the request is
validated it is forward to Cart server to place the order in the users
virtual cart. Right after, the customer DB is involved to save the
changes. The user request may now be sent forward for checkout process
that will involve order server instance. After all the user will receive
the page order interface with all the details.

\[h!\] ![image](../Figures/UML/SequenceDiagram1){width="100.00000%"}

System’s Implementation of the Web Application
==============================================

Overview of the used technology
-------------------------------

### Node.js runtime

As an asynchronous event driven JavaScript runtime, Node is designed to
build scalable network applications. In the following “hello world”
example, listing \[Node.js “hello world” example\] many connections can
be handled concurrently. Upon each connection the callback is fired, but
if there is no work to be done Node is sleeping
@Pedro-Teixeira-Professional-Node.js.

This is in contrast to today’s more common concurrency model where OS
threads are employed. Thread-based networking is relatively inefficient
and very difficult to use. Furthermore, users of Node are free from
worries of dead-locking the process, since there are no locks. Almost no
function in Node directly performs I/O, so the process never blocks.
Because nothing blocks, scalable systems are very reasonable to develop
in Node.

Node is similar in design to, and influenced by, systems like Ruby’s
Event Machine or Python’s Twisted. Node takes the event model a bit
further, it presents an event loop as a runtime construct instead of as
a library @Node-Doc. In other systems there is always a blocking call to
start the event-loop. Typically behaviour is defined through callbacks
at the beginning of a script and at the end starts a server through a
blocking call like EventMachine::run(). In Node there is no such
start-the-event-loop call. Node simply enters the event loop after
executing the input script. Node exits the event loop when there are no
more callbacks to perform. This behaviour is like browser JavaScript —
the event loop is hidden from the user.

HTTP is a first class citizen in Node, designed with streaming and low
latency in mind. This makes Node well suited for the foundation of a web
library or framework.

Just because Node is designed without threads, doesn’t mean you cannot
take advantage of multiple cores in your environment. Child processes
can be spawned by using our <span>`child_process.fork()`</span> API, and
are designed to be easy to communicate with. Built upon that same
interface is the <span>`cluster`</span> module, which allows you to
share sockets between processes to enable load balancing over your
cores.

### Express.js – web framework

Express is a routing and middleware web framework that has minimal
functionality of its own: An Express application is essentially a series
of middleware function calls.

Middleware functions are functions that have access to the request
object (req), the response object (res), and the next middleware
function in the application’s request-response cycle @Using-middleware.
The next middleware function is commonly denoted by a variable named
next.

Middleware functions can perform the following tasks:

-   Execute any code;

-   Make changes to the request and the response objects;

-   End the request-response cycle;

-   Call the next middleware function in the stack.

If the current middleware function does not end the request-response
cycle, it must call next() to pass control to the next middleware
function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

-   Application-level middleware;

-   Router-level middleware;

-   Error-handling middleware;

-   Built-in middleware;

-   Third-party middleware.

We can load application-level and router-level middleware with an
optional mount path. We can also load a series of middleware functions
together, which creates a sub-stack of the middleware system at a mount
point.

The example presented in figure \[Express.js - using a middleware with
no mount path\] shows a middleware function with no mount path. The
function is executed every time the app receives a request.

The example presented in figure \[Express.js - using a middleware with
mount path\] shows a middleware function mounted on the
<span>`/user/:id path`</span>. The function is executed for any type of
<span>`HTTP`</span> request on the <span>`/user/:id path`</span>.

### Passport.js – Authentication Middleware

Passport is authentication middleware for Node. It is designed to serve
a singular purpose: authenticate requests. When writing modules,
encapsulation is a virtue, so Passport delegates all other functionality
to the application @Passport.js-documentation. This separation of
concerns keeps code clean and maintainable, and makes Passport extremely
easy to integrate into an application.

In modern web applications, authentication can take a variety of forms.
Traditionally, users log in by providing a username and password. With
the rise of social networking, single sign-on using an OAuth provider
such as Facebook or Twitter has become a popular authentication method.
Services that expose an API often require token-based credentials to
protect access.

Passport recognizes that each application has unique authentication
requirements. Authentication mechanisms, known as strategies, are
packaged as individual modules. Applications can choose which strategies
to employ, without creating unnecessary dependencies.

Despite the complexities involved in authentication, code does not have
to be complicated.

### MongoDB

MongoDB is an open-source document database that provides high
performance, high availability, and automatic scaling
@Introduction-to-MongoDB.

A record in MongoDB is a document, which is a data structure composed of
field and value pairs. MongoDB documents are similar to JSON objects.
The values of fields may include other documents, arrays, and arrays of
documents.

The advantages of using documents are:

-   Documents (i.e. objects) correspond to native data types in many
    programming languages (in our case JavaScript);

-   Embedded documents and arrays reduce need for expensive joins;

-   Dynamic schema supports fluent polymorphism.

Also MongoDB provides high performance data persistence. It supports for
embedded data models reducing I/O activity on database system, and
indexes supports faster queries and can include keys from embedded
documents and arrays @Web-Development-with-MongoDB.

### Elasticsearch

Elasticsearch is a distributed, open source search and analytics engine,
designed for horizontal scalability, reliability, and easy management.
It combines the speed of search with the power of analytics via a
sophisticated, developer-friendly query language covering structured,
unstructured, and time-series data.

Major highlights of elasticsearch:

-   Elastic Search is built on top of Lucene, which is a full-featured
    information retrieval library, so it provides the most powerful
    full-text search capabilities of any open source product;

-   Elastic Search is document-oriented. It stores real world complex
    entities as structured JSON documents and indexes all fields by
    default, with a higher performance result;

-   Elastic Search implements a lot of features, such as customized
    splitting text into words, customized stemming, facetted search, and
    more;

-   Elastic Search is schema free—instead, it accepts JSON documents, as
    well as tries to detect the data structure, index the data, and make
    it searchable;

-   Elastic Search is API driven; actions can be performed using a
    simple Restful API.

Elasticsearch combines the power of a full text search engine with the
indexing strengths of a JSON document database to create a powerful tool
for rich data analysis on large volumes of data. With Elasticsearch the
systems searching can be scored for exactness letting the system dig
through its data set for those close matches and near misses which the
system could be missing.

### Stripe payment

Stripe is the one of best and easy way to accept payments online and in
mobile apps. It offers APIs and very good technical documentation that
offers small business a way of accepting online payments without huge
amount of investments. Stripes charges a small percentage for each
transaction. Also it offers a nice dashboard were users can see some
statistics and find information about all transactions and customers
credentials. Besides that Stripes offers a testing platform which is
used while the application is in development for testing if everything
works properly.

### EJS template engine

EJS is a simple templating language that lets us generate HTML markup
with plain JavaScript. It is a set of two open source libraries
providing in-browser client side templates for web development and as a
template system for node.js (including client-side template
functionality).

Core features of EJS template engine @Effective-JavaScript-templating:

-   Fast compilation and rendering;

-   Simple template tags: &lt;% %&gt;;

-   Custom delimiters (use &lt;? ?&gt; instead of &lt;% %&gt;);

-   Both server JS and browser support;

-   Static caching of intermediate JavaScript;

-   Static caching of templates;

-   Complies with the Express view system.

EJS has speedy execution time and is very easy to debug for errors. Also
EJS has fast development time manly because it uses plain JavaScript
syntax. EJS has a large community of active users, and the library is
under active development.

System’s Server Side Components
-------------------------------

### User Model Characteristics

For user authentication I have used morgan library with the aim of
logging the user requests to the web server (e.g. access to different
routes). For the User Schema I used mongoose, which is an Object
Relational Mapper, which is like a virtual object database, that can be
used within Node itself. Basically it connects our Node.js project with
MongoDB database, without the need to implicitly connect them using
additional code.

The listing \[The defined User Schema\] shows how the User Schema is
defined. From the schema we can derive that the user entity is described
by nine characteristics:

-   <span>`email`</span> - this variable stores the user email address;

-   <span>`password`</span> - this variable stores the hashed password
    of the user;

-   <span>`facebook`</span> - this variable stores facebook ID of the
    user;

-   <span>`tokens`</span> - this variable stores the facebook API token;

-   <span>`profile`</span> - this object stores 2 main variables:

    -   <span>`name`</span> - this variable stores the full name of the
        user;

    -   <span>`picture`</span> - this variable stores the virtual
        address link to the users avatar or profile picture.

-   <span>`address`</span> - this variable stores the physical address
    of the user;

-   <span>`gender`</span> - this variable stores the gender of the user;

-   <span>`age`</span> - this variable stores the age of the user;

-   <span>`history`</span> - this object stores 2 main variables:

    -   <span>`paid`</span> - this variable stores the price value of
        the certain product bought;

    -   <span>`item`</span> - this variable stores the item ID of the
        certain product bought.

### Product Model Characteristics

The products and category models were implemented similar with the user
one. The listing \[The defined Product Schema\] shows how the Product
Schema is defined. From the schema we can derive that the user entity is
described by seven characteristics:

-   <span>`category`</span> - this variable stores the category id of
    the certain product.

-   <span>`brand`</span> - this variable stores the brand of the
    certain product.

-   <span>`supermarket`</span> - this variable stores the supermarket
    name of the certain product or it can be bought.

-   <span>`name`</span> - this variable stores the name of the
    certain product.

-   <span>`description`</span> - this variable stores the description of
    the certain product.

-   <span>`price`</span> - this variable stores the price of the
    certain product.

-   <span>`image`</span> - this variable stores the virtual image
    address of the certain product.

### User Authentication - Signup and Login

In order the user to have the possibility to register and to login into
the system we have used passport library that also comes along with
localstrategy library that together make that possible.

For both signup and login functionalities the system must have for each
of them a post and get method. In listing \[Get and Post method of login
rout\] we can see how the middleware that was created are used, namely
local-login in passport and then we pass in an object to this second
parameter, successRedirect to profile url, or if failure, than redirect
to /login url.

### Cookie and Session usage

The session stores data like user-id in temporary memory store (temp,
local, redis, or in our case mongodb). The cookie parser will parse the
cookie header and handle cookie separation and encoding, take the
session data, encrypt it and send it to browser.

Few steps are required to set up the cookie and session functionality:

-   Install db for storing the session (library connect-mongo)

-   Mongo store library is depending on express-sesion, without
    express-session (session) it won’t work

-   Instead of saving anything to a temporary memory store, we want to
    save the session into MongoDB database

-   Every session will be saved into DB, which is MongoDB

-   MongoStore in our case specifically stores the session on the
    server-side

### Gravatar functionality

When the user clicks or is redirected to its profile page, an avatar
called gravatar is displayed. It is made by creating a custom method
inside the user model file, called UserSchema.methods.gravatar. This
method checks the existence of the size of the avatar and the existence
of the user’s email. If the user doesn’t have the email for any reason,
a default gravatar is provided. Otherwise, a unique gravatar is created
for each user profile based on the md5 digest of the user’s email. If
the user will login using facebook credentials we will import his/her
profile picture and from time to time will check if the picture wasn’t
changed.

### Edit profile

The user may edit his/her profile data information. For this the user
types in the req.body.name the new information and according to the name
of the body, the user.profile data structure is being modified. Then
simply the user data is saved and flash the message, and store the flash
in the session. All this implies both get and post method that can be
seen in listing \[Get and Post method of editing the users profile\].

### Special routes

The system offers two special routes. In figure
\[developer-add\_category\_1\] is shown how we can add a new category
for further using it in adding new product.

The second special route is for adding a new product into the system and
for generating it’s QR code. In figure \[developer-qr-1\] shows the
implementation of the adding the product to database functionality.

In order to add a product to the database mandatory fields must be
completed:

-   Product Name;

-   Category which products belong to;

-   Brand that produces the product;

-   Supermarket that sells the product;

-   Product descriptions;

-   Product price.

The figure \[developer-qr-2\] shows the implementation of the QR code
generator. The image is generated right after the user adds the new
product to the database.

### Search feature

For search engine mongoosastic library was used. This library uses
elasticsearch to replicate the data from MongoDB. The mapping code maps
product collection from DB and elasticSearch, so that it creates a
“bridge” between replica set and product collection. Listing \[Get and
Post method of seaching a product feature\] shows the implementation of
both methods (POST, GET) that search feature relies on.

There are 2 types of search implemented in the system:

-   Regular search;

-   Instant search.

Regular search offers users to search by specifying at least 1 word of
the products name. As you can see in figure \[Regular search – searching
by part of the product name\] a query was made on word “natakhtari”, the
search query is case insensitive so the system dose care if the query
word is in the beginning, centre or at the end of the product full name.

Also regular search offers possibility to search word that contains in
the product description. As you can see in figure \[Regular search –
searching by part of the products description\], a word “Moldova” was
query and product “Natakhtari” appeared on result. This is because in
the product description of “Natakhtari” the word “Moldova” was
specified.

Second type of search is “Instant search”. It have all the features of
the “Regular search” with the only exception of how the result is
returned. In instant search the user dos not need to press enter or
search button after he/she types the query word. Using the AJAX
technology in addition the system search in real time while the user
types the key word.

Listing \[The systems logs of the instant search\] presents the logs of
the system when a user uses instant search. As we can see also in the
figure \[Instant search – searching by part of the products name\] when
a user starts typing the word, with every letter he/she types the system
makes a search and outputs the results in real time without the need of
pressing enter or search button. In this way user consume less time and
can find his/her product without knowing the full products part of the
name.

### Cart and Payment feature

Every user have his own virtual cart. Listing \[The defined virtual Cart
Schema\] provides information about what is stored in each virtual cart.
As we can observe, every cart stores the owner id, all the products
he/she added along with the prices and quantity information and the
total amount of money to be payed.

While adding products to cart, as shown in figure \[Add more same
products to the cart\] users can add more same products at the same
time. Also while viewing his/her cart, as shown in figure \[Remove a
product from the cart\] user may remove the products before proceeding
to checkout.

When the user finishes his/her shopping, it checkouts using credit or
debit card throw the Stripes payment system. For that user needs to
introduce his/her credit card credentials.

Stripe payment system offers a testing environment were we can use
different testing type of credit card along with full credentials
information offered them. In figure \[Introduce user credentials\] we
can observe the interface that allows user to introduce their credit
card information. This form also validates the type of information
inserted.

If the credit card information was correct and the card itself is valid
then the payment process is done. Using the Stripe dashboard illustrated
in figure \[Stripe dashboard\] the system administrator can see some
statistics along with the information about the customers transactions.
Also Stripe dashboard offers refund methods to the users credit card in
case of fraud or some system errors.

Figure \[Purchases history of the user\] shows the view that users are
redirected to, once payment was done successful. There user can see
his/her own history of purchases. The data shown in history page of the
users is updated on every request. If the user made his/her payment
using mobile application then history from web application will also be
updated.

Communication Protocol
----------------------

The system is based on REST communications protocol. REST stands for
Representational State Transfer. It relies on a stateless,
client-server, cacheable communications protocol – and in virtually all
cases, the HTTP protocol is used @Hypertext-Transfer-Protocol. Also the
server can handle a divers HTTP methods for both mobile and web
application.

The system respects the following REST principles:

-   <span>`Resources`</span> expose easily understood directory
    structure URIs;

-   <span>`Representations`</span> transfer JSON or XML to represent
    data objects and attributes;

-   <span>`Messages`</span> use HTTP methods explicitly (for example,
    GET, POST, PUT, and DELETE);

-   <span>`Stateless`</span> interactions store no client context on the
    server between requests. State dependencies limit and
    restrict scalability. The client holds session state.

An example of HTTP method for web application as well as for mobile one
can be seen in . There as you can see the server returns (using REST API
communication protocol – GET method) all products of a specified
category. For web application it returns them in form of a webpage that
is rendering. But for the mobile applications returns a simple JSON
object containing all the data that can further be processed by the
mobile application logic. The same logic is used for other types of
mobile requests or web requests. The reason of separating them is
because usually mobile applications need the information in JSON or XML
format that sometimes differs from the format the web application is
using.

Database implementation
-----------------------

MongoDB was used for storing the data. As we used node.js technology for
implementing the server side, MongooseJS library was employed. It
provides a straightforward schema-based solution for modeling the
application data and includes built-in type casting, validation, query
building, business logic hooks and more–out of the box methods. Listing
\[Connecting node.js application to MongoDB server\] show a how simple
is to connect to a MongoDB server throw node.js application.

The data base architecture used for building the platform consist of 5
main collections:

-   <span>`carts`</span>: Stores documents that contains information
    about the virtual cart of the user;

-   <span>`categories`</span>: Stores documents that contains all kinds
    of products categories the system offers;

-   <span>`products`</span>: Stores documents that contains all the
    information about the products;

-   <span>`sessions`</span>: Stores documents that contains information
    about the sessions;

-   <span>`users`</span>: Stores information about the users.



Conclusions {#conclusions .unnumbered}
===========

When it comes to commerce, there’s no denying the power of the Internet.
Over the last 15 years, the world of online retail has transformed the
way products are bought and sold, creating a society of consumers
accustomed to the convenience of click-and-buy. Mobile strategies play a
growing role in eCommerce, in particular in emerging markets, where
Web-access and eCommerce transactions depend on mobile rather than
traditional desktop access. Online grocers are learning to leverage
mobile to grow adoption in key markets, such as India and China.

Online groceries still face obstacles, the top reason that consumers
cited for why they have never bought groceries online was their
preference to pick the food they want themselves. In other words, buying
food, especially fresh products, remains a tactile, personal experience.
The system described in this thesis solves this issues by allowing the
customer to make shopping at the same time online but with the option of
choosing products in live.

The Sales Management System represents the thesis work outcome. It
supplies retailers necessary software services that augments the sales
process and provides a modern way for the customers to check out. The
platform composed of three key elements that in combination represents a
unique sales system for the Moldovian market. The first one is a mobile
application which is designed for Apple’s Iphone devices. The second one
is the server side of the system that provides API that handles the main
logic parts of the platform. And the third one is the web interface that
acts as a dashboard for the user. There the customer can monitor their
activity. The thesis outcome represents an obvious benefit for Moldova’s
economy and taking into account that the product has no relevant
competitors on the market, it should be economically feasible to
integrate it quickly and efficiently.

Retailers will enlarge their income considerably by implementing the
nominated sales model, so the flow of the clients will be substantially
faster, as a consequence of minimised queues formation. Customer’s
experience will be improved as well and thus the client circulation will
be increased. Aside from the big retail players and regular consumers,
small businesses may also benefit from the product. Consequently, an
entrepreneur who is in the circumstance of opening a little shop which
merchandises goods, will need to pay less employees working at the point
of sale desks, particularly during rush hours.

Working on the web application part of the project proved to be a
challenging experience. Not only the RESTful API building on server side
proved to be difficult, but also creating the web interface design. This
was an opportunity to leverage powerful language features and working on
a small distributed system. Also when dealing with payment API feature,
it was really frustrating task, mainly because a simple error of digits
could cause huge negative impact for the entire system. Thats way
building this feature took much more time then expected.

While working on the project many innovative ideas came into sight. In
order to materialise those ideas it is needed to establish a fruitful
collaboration with retailer representatives. In long term the system
will have the possibility to predict many useful selling strategies
along with offering valuable advices in decision making by presenting
novel statistic data. All together will bring the customers shopping
experience to a new level and retails will increase their performance by
selling more with less effort and optimising their decision-making.



Pedro Teixeira, Professional Node.js, Wrox, 2012

Mithun Satheesh, Bruno Joseph D’mello, Jason Krol, Web Development with
MongoDB and NodeJS, 2nd Edition, Packt Publishing, 2012

Leonard Richardson, Mike Amundsen, Sam Ruby, RESTful Web APIs, 2013

Node.js documentation,\
<https://nodejs.org/en/docs/>

Using middleware,\
<http://expressjs.com/en/guide/using-middleware.html>

Introduction to MongoDB,\
<https://docs.mongodb.com/v3.0/introduction/>

Passport.js documentation,\
<http://passportjs.org/docs>

API – Application Program Interface,\
<http://www.webopedia.com/TERM/A/API.html>

API – Application Program Interface,\
<http://www.ibm.com/developerworks/rational/library/dec04/bell/>

Arash Yahya, Build a Real Time web app in node.js , Angular.js,
mongoDB,\
<https://www.udemy.com/user/johnnycaperoni/>

Arash Yahya, Build an Amazon clone: Nodejs + MongoDB + Stripe Payment,\
<https://www.udemy.com/user/johnnycaperoni/>

Designing Web Applications,\
<https://msdn.microsoft.com/en-us/library/ee658099.aspx>

Hypertext Transfer Protocol,\
<https://spring.io/understanding/REST>

Effective JavaScript templating,\
<http://ejs.co>
