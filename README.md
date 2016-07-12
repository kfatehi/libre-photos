# libre-photos

Serves your Apple Photos library as a web service.
It serves a simple web client that you can use to browse the contents of your photo library from any device.

## examples

`bin/libre-photos --library Photos\ Library.photoslibrary`

`bin/libre-photos --copy --library Photos\ Library.photoslibrary`

## troubleshooting

Some libraries cannot be opened due to a `SQLITE_CANTOPEN` error.
This is likely to occur when accessing a photo library through a network file system (NAS), for example.
This can be worked around by having the system make a copy of the database first.
This copy facility is exposed as a flag `--copy` which will first copy the databases locally.
The downside to this is that you will need to restart the server when making any changes to your library in order that `libre-photos` can see the new content.
