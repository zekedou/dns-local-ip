# dns-local-ip

> A DNS server which always answers my IP in local network.

## Usage

```
dns-local-ip <port> [--debug]
```

## Example

Start a server:

```sh
# start a server
$ dns-local-ip 6000

# start a server with debug flag
$ dns-local-ip 6000 --debug
```

Request a DNS record:

```sh
$ dig @127.0.0.1 -p 6000 www.example.com

# no matter which domain you query, the server will always answer
# the IP in local network.
```

## License

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
