!# /usr/bin/bash
curl -XPOST -H "Content-type: application/json" -d '{
	"resourceType": "Patient",
	"name": [{
	    "given": ["Debbie"],
	    "family": "Harry"
	  }],
	"telecom": [{
	  "system": "email",
	  "value": "debbyharry@email.com"
	}
	],
	"gender": "female",
	"birthDate": "1945-07-01T00:00:00.000",
	"address": [{
	"text": "Some Street",
	"city": "Some city",
	"country": "Some country"
	}],
	"photo": [{"url" : "/mock/debbie.jpg"}]
}' 'localhost:8080/fhir/Patient'

curl -XPOST -H "Content-type: application/json" -d '{
	"resourceType": "Patient",
	"name": [{
	    "given": ["Brian", "Marilyn", "Manson"],
	    "family": "Warner"
	  }],
	"telecom": [{
	  "system": "email",
	  "value": "mansonm@email.com"
	}
	],
	"gender": "unknown",
	"birthDate": "1969-01-05T00:00:00.000",
	"address": [{
	"text": "Some Street",
	"city": "Some city",
	"country": "Some country"
	}],
	"photo": [{"url" : "/mock/manson.png"}]
}' 'localhost:8080/fhir/Patient'

curl -XPOST -H "Content-type: application/json" -d '{
	"resourceType": "Patient",
	"name": [{
	    "given": ["Alanis"],
	    "family": "Morissette"
	  }],
	"telecom": [{
	  "system": "email",
	  "value": "alanism@email.com"
	}
	],
	"gender": "female",
	"birthDate": "1974-06-01T00:00:00.000",
	"address": [{
	"text": "Some Street",
	"city": "Some city",
	"country": "Some country"
	}],
	"photo": [{"url" : "/mock/alanis.jpg"}]
}' 'localhost:8080/fhir/Patient'

curl -XPOST -H "Content-type: application/json" -d '{
	"resourceType": "Patient",
	"name": [{
	    "given": ["Neil"],
	    "family": "Young"
	  }],
	"telecom": [{
	  "system": "email",
	  "value": "neil_young@email.com"
	}
	],
	"gender": "male",
	"birthDate": "1945-11-12T00:00:00.000",
	"address": [{
	"text": "Some Street",
	"city": "Some city",
	"country": "Some country"
	}],
	"photo": [{"url" : "/mock/neil.jpeg"}]
}' 'localhost:8080/fhir/Patient'

curl -XPOST -H "Content-type: application/json" -d '{
	"resourceType": "Patient",
	"name": [{
	    "given": ["Kanye"],
	    "family": "West"
	  }],
	"telecom": [{
	  "system": "email",
	  "value": "kwest@email.com"
	}
	],
	"gender": "female",
	"birthDate": "1977-06-08T00:00:00.000",
	"address": [{
	"text": "Some Street",
	"city": "Some city",
	"country": "Some country"
	}],
	"photo": [{"url" : "/mock/kanye.jpg"}]
}' 'localhost:8080/fhir/Patient'


