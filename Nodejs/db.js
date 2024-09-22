const mysql = require('mysql2/promise'); 

const db = mysql.createPool({
    host: 'mysql-103e0116-khanvirus125-e4b3.d.aivencloud.com',
    user: 'avnadmin',
    database: 'khan',
    password: 'AVNS_lRYtTeB9J3_KpB-eTKu',
    ssl: {
        ca: `-----BEGIN CERTIFICATE-----
        MIIEQTCCAqmgAwIBAgIURTeD9EGw/x4q4QVgli3lbrpoqq4wDQYJKoZIhvcNAQEM
        BQAwOjE4MDYGA1UEAwwvZDMzZTBiN2UtNGFlYy00MjVjLTg1YjktYTY1YjNiNWIw
        YzViIFByb2plY3QgQ0EwHhcNMjQwNDI4MDYzODM1WhcNMzQwNDI2MDYzODM1WjA6
        MTgwNgYDVQQDDC9kMzNlMGI3ZS00YWVjLTQyNWMtODViOS1hNjViM2I1YjBjNWIg
        UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALwYsSUy
        z8qpsms5aotn3gIhZxWxDk6zt7YPwpJAcahDt5zqsMwhedb4bNxwL3P82mKWt4Ai
        hjJWGfcBFt8bktOxWxRLcNujZNP3MBwVastPoQQjHppCY8IkvYmmXGpz5HfBdv/Z
        IxM+moG92KLNRdj7+zCysCwDMgWGhXKE163FLmIyGgd+wsyRIEZLzADj5/7OAkjv
        3AWPU2bbpjKv0/cRMV62OLMtUjeFvtkbmIHPYQudVJMY4jcmu5R00B/oX+Qcb2E7
        aAK4lYp/srWJF3oOLOpPBLTd9LyCjhDdXGuv+V4Rbnf1nGNg9NieHToWkRYMSVDU
        Hbe20um+ZHfzE25E6je355+zu2jOarn4dn1GskzWq8ONi/0t1Bg4yBtnheb1nw0K
        pfuiQ+ZHt/riSOENw9OL7VFaBk+AEqNUWy0efjLUMzf0h2XWWGC3E5gN6t97aAo0
        r/kp5g8lY8AGB1n5CwuJN3i4si1ejrgaiJXREdHr234rvfQ9LXelWC+pnQIDAQAB
        oz8wPTAdBgNVHQ4EFgQUptZXD5TeWGPbFtPcI8aMUucNSuwwDwYDVR0TBAgwBgEB
        /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAI4IZawoXir6THlO
        gK5IzkChoKE/Mpw8KKUqUV4TTO3eK4dOngThiIlNZmu/3xiogOSTvOt2IdSnKKvg
        eLnxVXcQjlGuwwFrc/1ZI0sren0UZiSo7MO6hOUpDNkZ9nYUlNDbzg9bUN+w5Qf9
        ZW2U/yuxumIvYEmJ6f4ZkpxnVSriR4Shkto0tBMO7NjMD1Wk/HVBOv9kZbbYn3nB
        0RnwDkRu/4txOAFDFrlOmHCVKVpTNHVXRXMJIp9MGQPkds5v/314KFOKNMpZqAxP
        LOr+sRQcUfib9NapZd345hVjsAkgcGmdCkOKO2yLZzOxVeGipQwTDys8/47O6Gmw
        Ffq/HnTwwvNffCKHyvsOPc7cZEZ/MRNOOP4Xeo4khWo8I/nMpdNpsiwdq87A5LYn
        Coe5da+wpXXx6ZTlb7QsAt2/vYySEcR0pIXxxoNzQ6xpEMn21CNCZvNFAy3RVmtR
        QsKADT1abYBwZJTLc5lz+1nvxsb6c4QQ1nLiTMPPJHUYZapbjA==
        -----END CERTIFICATE-----`,
        rejectUnauthorized: false
    },
    port: 13249,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = db;
