/**
 * calcualte specular reflection
 * @param {Vector3} incomingVector
 * @param {Vector3} normalVector
 * @returns {Vector3} outgoingVector
 */

function specularReflection(incomingVector, normalVector) {
   
   //Vout = Vin - 2(Vin * n) * n -> specular reflection formula

   outgoingVector = new THREE.Vector3()

   let incomingVector1 = incomingVector.clone();
   let normalVector1 = normalVector.clone();
   normalVector1.normalize();
   normalVector1.multiplyScalar(2.0 * incomingVector1.dot(normalVector1));
   outgoingVector.subVectors(incomingVector1, normalVector1);

   return outgoingVector
}
