# demo 1 - docker 101

```
cd demo1_docker
docker build --tag=demo1:v1 .
docker run -p 8080:8080 demo1:v1
curl localhost:8080
```

# demo 2 - kubernetes ops 101

```
gcloud config set project devops-with-k8s-hello-world
gcloud container clusters create my-cluster \
  --zone=europe-west1-b \
  --num-nodes=2 \
  --preemptible \
  --async

# observe the state of the cluster cration (state: PROVISIONING -> RUNNING)
gcloud container clusters list

# login kubectl with the correct cluster credentials
gcloud container clusters get-credentials my-cluster --zone europe-west1-b
```

# demo 3 - kubernetes 101
```
cd demo3_k8s_hello-world
docker build --tag=eu.gcr.io/devops-with-k8s-hello-world/demo3:v1 .
docker push eu.gcr.io/devops-with-k8s-hello-world/demo3:v1

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
# note; the external ip reservation takes time (1-2 minutes)
# retrieve external ip of service
kubectl get service
curl <remote_ip>
# observe that invoking curl a few times round-robin-ishes us over the pods
curl <remote_ip>
curl <remote_ip>
curl <remote_ip>
```

# demo 4 - rolling update

```
cd demo4_k8s-rolling-update

docker build --tag=eu.gcr.io/devops-with-k8s-hello-world/demo4:v1 .
docker push eu.gcr.io/devops-with-k8s-hello-world/demo4:v1

kubectl apply -f deployment.yaml

# demo that our application is able to handle all requests 250qps with 100% success
# load test + perceive what happens with pods
fortio load -c 8 -qps 250 -t 20s http://104.199.45.230/

# open second terminal so we can observe what happens with the pods during the deployment
watch -n 1 kubectl get pods

# invoke the load test for a bit longer while after 10 seconds appyling the deployment in the first terminal
fortio load -c 8 -qps 250 -t 40s http://104.199.45.230/

# create third terminal in which we will apply the new deployment
# change something (add label?) in the deployment and re-apply the yaml to trigger rolling update
kubectl apply -f deployment.yaml

# observe 100% 200 OK result during rolling deployment
```

After rolling deploy look at the primitives in Kubernetes. Dive into the deployments, replicasets and how to revert the deploy

```
kubectl rollout status deployment demo4
kubectl describe deployment demo4
kubectl rollout history deployment demo4
kubectl rollout undo deployment demo4
kubectl rollout undo deployment demo4 --to-revision=XXX
```