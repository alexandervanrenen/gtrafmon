# gtrafmon

Google TRAFic MONitor.

It retrievs the current travel time between two locations into a file.

Install:
``
npm install fs puppeteer
``

Run:
``
node main.js
``

In combination with cron jobs it can create a handy chart for the day:
```
Time of day | Travel time
11:00	11
11:05	12
11:10	12
11:15	13
11:20	15
11:45	12
11:50	12
11:55	12
```
