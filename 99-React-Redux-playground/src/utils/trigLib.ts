// trigLib.ts

      class TrigLib {
  /**
   * Converts degrees to radians.
   * @param {number} degrees - The angle in degrees.
   * @returns {number} - The angle in radians.
   */
  static degreesToRadians(degrees: number): number {
    if (typeof degrees !== "number") {
      throw new Error("degreesToRadians: degrees must be a number");
    }
    return (degrees * Math.PI) / 180;
  }
  /**n
   * Converts radians to degrees.
   * @param {number} radians - The angle in radians.
   * @returns {number} - The angle in degrees.
   */
  static radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  /**
   * Calculates the sine of an angle (in degrees).
   * @param {number} degrees - The angle in degrees.
   * @returns {number} - The sine of the angle.
   */
  static sin(degrees: number): number {
    const radians = TrigLib.degreesToRadians(degrees);
    return Math.sin(radians);
  }

  /**
   * Calculates the cosine of an angle (in degrees).
   * @param {number} degrees - The angle in degrees.
   * @returns {number} - The cosine of the angle.
   */
  static cos(degrees: number): number {
    const radians = TrigLib.degreesToRadians(degrees);
    return Math.cos(radians);
  }

  /**
   * Calculates the tangent of an angle (in degrees).
   * @param {number} degrees - The angle in degrees.
   * @returns {number} - The tangent of the angle.
   */
  static tan(degrees: number): number {
    const radians = TrigLib.degreesToRadians(degrees);
    return Math.tan(radians);
  }

  /**
   * Calculates the arcsine of a value and returns the angle in degrees.
   * @param {number} value - The value for which to calculate the arcsine.
   * @returns {number} - The angle in degrees.
   */
  static asin(value: number): number {
    const radians = Math.asin(value);
    return TrigLib.radiansToDegrees(radians);
  }

  /**
   * Calculates the arccosine of a value and returns the angle in degrees.
   * @param {number} value - The value for which to calculate the arccosine.
   * @returns {number} - The angle in degrees.
   */
  static acos(value: number): number {
    const radians = Math.acos(value);
    return TrigLib.radiansToDegrees(radians);
  }

  /**
   * Calculates the arctangent of a value and returns the angle in degrees.
   * @param {number} value - The value for which to calculate the arctangent.
   * @returns {number} - The angle in degrees.
   */
  static atan(value: number): number {
    const radians = Math.atan(value);
    return TrigLib.radiansToDegrees(radians);
  }
}

export default TrigLib;
