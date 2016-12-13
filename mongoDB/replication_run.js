db = connect(getHostName()+":40000/test");
var cfg = { 
    _id: 'testApp',
    members: [
        { _id: 0, host: getHostName()+":40000"},
        { _id: 1, host: getHostName()+":40001"},
        { _id: 2, host: getHostName()+":40002", arbiterOnly: true}
    ]
};
rs.initiate(cfg);