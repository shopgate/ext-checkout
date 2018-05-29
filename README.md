# Shopgate Connect checkout extension
## About Shopgate
Shopgate is the leading mobile commerce platform.
Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
## License
Shopgate Connect - cart extension is available under the Apache License, Version 2.0.
See the [LICENSE](./LICENSE) file for more information.


##
#### Get Totals pipeline

The pipeline is designed to collect in a push manner totals parts from other extensions 
and calculate total after collection is done. Also return a currency for checkout.

Input for a pipeline is empty.
Every extension, should append custom step into pipeline to inject (push) part of totals, 
needed for checkout process and authorising a final order. 
