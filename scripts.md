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

gcloud container clusters list
gcloud container clusters get-credentials my-cluster --zone europe-west1-b
```

# demo 3 - kubernetes 101
```
cd demo3_k8s_hello-world
docker build --tag=eu.gcr.io/devops-with-k8s-hello-world/demo3:v1 .
docker push eu.gcr.io/devops-with-k8s-hello-world/demo3:v1

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# achterhalen remote ip
kubectl get service
curl <remote_ip>
```

# demo 4 - rolling update

```
cd demo4_k8s-rolling-update

docker build --tag=eu.gcr.io/devops-with-k8s-hello-world/demo4:v1 .
docker push eu.gcr.io/devops-with-k8s-hello-world/demo4:v1

kubectl apply -f deployment.yaml

# load test + perceive what happens with pods
fortio load -c 8 -qps 250 -t 40s http://104.199.45.230/
watch -n 1 kubectl get pods

# change something in the deployment
kubectl apply -f deployment.yaml
```

Now dive into the deployments, replicasets and how to revert

```
kubectl rollout status deployment demo4
kubectl describe deployment demo4
kubectl rollout history deployment demo4
kubectl rollout undo deployment demo4
kubectl rollout undo deployment demo4 --to-revision=XXX
```