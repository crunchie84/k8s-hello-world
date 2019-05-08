# Kubernetes hello world

This repository contains a few demo's used during a presentation of development & operating Kubernetes. The [slides of which can be found on Speakerdeck](https://speakerdeck.com/crunchie84/kubernetes-wat-is-het-wat-brengt-het-wat-vraagt-het) (Talk was in dutch, most slides are language-agnostic).

# Requirements

The commands to invoke for the demo's are found in [scripts.md](scripts.md). They expect you to have the following commandline tooling installed:

- `gcloud` - https://cloud.google.com/sdk/docs/
- `kubectl` - `gcloud components install kubectl`
- `docker` - https://docs.docker.com/docker-for-mac/install/
- `npm` - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

The demo's rely on one external service `my-demo-service` which needs to be manipulated during the demo's to wire the external endpoint to the correct internal demo using its appropiate label. Invoke `kubectl edit service my-demo-service` to edit the running service and change the `labelSelector` to point to the correct `demo3` `demo4` label. The reasoning behind this is that the allocation of external IP addresses takes a lot of time during the demo.